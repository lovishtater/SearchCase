import React from "react";
import "./searchbar.css"
const Searchbar = () => {

  const [search, setSearch] = React.useState("");

  const debounce = (func : Function, wait : number) => {
    console.log(func, wait);
    let timeout : number | NodeJS.Timeout | undefined;
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
    <div className="search-box">
      <input className="search-input" type="text" placeholder="Search something.." onChange={(e) => handleChange(e.target.value)} />
        <button className="search-btn"><i className="fas fa-search"></i></button>
    </div>
  );
};

export default Searchbar;
