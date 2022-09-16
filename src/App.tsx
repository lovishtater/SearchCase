import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Loading from "./components/Loading/Loading";
import Searchbar from "./components/Searchbar/Searchbar";
import NewsCard from "./components/NewsCard/NewsCard";
import axios, { CancelTokenSource } from "axios";
import Pagination from "./components/Pagination/Pagination";
import NotFound from "./components/Error/404";
import SomethingWentWrong from "./components/Error/SomethingWentWrong";



function App() {
  const [search, setSearch] = useState("India");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValidation, setSearchValidation] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [NewsPerPage, setNewsPerPage] = useState(10);
  const queryCache = useRef<any>({}); 
  const cancelToken = useRef<CancelTokenSource | undefined>(undefined);
  const NewsApi = new URL("https://api.newscatcherapi.com/v2/search")

  const getCachedNews = (search : string) => {
    if (queryCache.current[search]) {
      return queryCache.current[search];
    } else {
      return null;
    }
  }

  const setCachedNews = (search : string, news : any) => {
    queryCache.current[search] = news; 
  }

  const fetchNews = async() => {
    setLoading(true);
    setSearchValidation("");
    setError("");
    let cachedNews = getCachedNews(search);
    if (!cachedNews) {
      if (typeof cancelToken !== typeof undefined) {
        cancelToken.current?.cancel();
      }
      cancelToken.current = axios.CancelToken.source();
      try {
        NewsApi.searchParams.append("q", search)
    const response = await axios.get(NewsApi.toString() , {
      cancelToken: cancelToken.current.token,
      headers: {
        "x-api-key": "Ciy8wN3sKTwkhXnEs67z6XNrKkRQLaf6iipYhtMbo-E",
      },
    },
    );
    cachedNews = response.data.articles;
    setCachedNews(search, cachedNews);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request cancelled");
    }else {
      setError("Something went wrong");
      console.log(error) 
    }
  }
}
    setNews(cachedNews);
    setLoading(false);
    setCurrentPage(1);
  }

  const getIndexOfLastNews = currentPage * NewsPerPage;
  const getIndexOfFirstNews = getIndexOfLastNews - NewsPerPage;
  const currentNews = news?.slice(getIndexOfFirstNews, getIndexOfLastNews);

  useEffect(()=>{
    if (search?.length > 2) {
    fetchNews();
    } else {
    setSearchValidation(`Please enter ${3 - (search?.length) } more characters`);
    }
  }, [search, searchValidation])


  return (
    <div>
      <Navbar />
      <div className="container flex">
        <Searchbar error={searchValidation} setSearch={setSearch}  fetchNews={fetchNews} />
      </div>
      <div className="container flex flex-col">
        <div className="news-container">
        {error ? 
        <SomethingWentWrong /> : 
        loading ? 
        <Loading /> :
        !currentNews ?
        <NotFound /> :
        <>
        <Pagination 
        postsPerPage={NewsPerPage} 
        setPostsPerPage={setNewsPerPage}
        totalPosts={news?.length} 
        setCurrentPage={setCurrentPage} 
        currentPage={currentPage} />
            {currentNews?.map((article , index) => (
              <NewsCard article={article}  key={index} />
            ))}
        <Pagination 
        postsPerPage={NewsPerPage} 
        setPostsPerPage={setNewsPerPage}
        totalPosts={news?.length} 
        setCurrentPage={setCurrentPage} 
        currentPage={currentPage} />
          </>
        }
          </div>
      </div>
    </div>
  );
}

export default App;