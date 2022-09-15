import "./searchbar.css"

const Searchbar = ({ setSearch, fetchNews, error} :
   {
      setSearch: (search: string) => void,
      fetchNews: () => void,
      error: string
   }) => {
  const debounce = (func: Function, wait: number) => {
    let timeout: number | NodeJS.Timeout | undefined;
    return (...value: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(value);
      }, wait);
    };
  };

  const handleChange = debounce((value: string) => {
    setSearch(value);
  }, 1000);
  return (
    <div className="searchbar">
    <div className="search-box">
      <input 
      className="search-input" 
      type="text" 
      placeholder="Search for news" 
      onChange={(e) => handleChange(e.target.value.toLowerCase())} />
    <button 
    className="search-btn"
    onClick={fetchNews}>
      <i className="fas fa-search"></i></button>
    </div>
    <p className="error-label">{error}</p>
    </div>
  );
};

export default Searchbar;
