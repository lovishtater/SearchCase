import React from "react";
import NoResultImage from "../../assets/noresult.png"; 

const NotFound = () => {
  return (
    <div className="flex flex-col">
        <img src={NoResultImage} alt="No Result" height="300px" width="300px" />
        <h3>Sorry, no results found</h3>
    </div>
  );
};

export default NotFound;
