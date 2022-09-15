import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Loading from "./components/Loading/Loading";
import Searchbar from "./components/Searchbar/Searchbar";
import NewsCard from "./components/NewsCard/NewsCard";
import axios from "axios";
import Pagination from "./components/Pagination/Pagination";
import NotFound from "./components/Error/404";

function App() {
  const [search, setSearch] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [NewsPerPage, setNewsPerPage] = useState(10);
  const queryCache = useRef<any>({}); 
  const cancelToken = useRef<any>(null);
  const NewsApi = new URL("https://newsapi.org/v2/everything?apiKey=85c93dbd7df14f07816179d6037e0db8")

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
    setError("");
    let cachedNews = getCachedNews(search);
    console.log(cachedNews, "News is cached")
    if (!cachedNews) {
      console.log(cachedNews, "News is not cached");
      if (typeof cancelToken !== typeof undefined) {
        cancelToken.current?.cancel();
      }
      cancelToken.current = axios.CancelToken.source();
      try {
        NewsApi.searchParams.append("q", search)
        console.log("Fetching news from API", search, NewsApi.toString());
    const response = await axios.get(NewsApi.toString() , {
      cancelToken: cancelToken.current.token
    });
    cachedNews = response.data.articles;
    setCachedNews(search, cachedNews);
      } catch (error) {
        console.log(error);
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
    if (search[0]?.length > 2) {
    fetchNews();
    } else {
    setError(`Please enter ${3 - (search[0]?.length || 0) } more characters`);
    }
  },[search, error])


  return (
    <div>
      <Navbar />
      <div className="container flex">
        <Searchbar error={error} setSearch={setSearch}  fetchNews={fetchNews} />
      </div>
      <div className="container flex flex-col">
        <div className="news-container">
        {loading ? 
        <Loading /> :
        currentNews?.length === 0 ?
        <NotFound /> :
        <>
        <Pagination postsPerPage={NewsPerPage} totalPosts={news?.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            {currentNews?.map(({ title, description, url, urlToImage  }) => (
          <NewsCard article={{
            title,
            description,
            url,
            urlToImage,
          }} />
        ))}
        <Pagination postsPerPage={NewsPerPage} totalPosts={news?.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
          </>
        }
          </div>
      </div>
    </div>
  );
}

export default App;