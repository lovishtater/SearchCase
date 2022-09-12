import React from "react";
import "./loading.css";

const Loading = () => {
  return (
        <div className="loading-container">
          <div className="smallcase-logo">
              <div className="smallcase-logo-top-rectangle"></div>
              <div className="smallcase-logo-triangle"></div>
              <div className="smallcase-logo-side-rectangle"></div>
          </div>
          <div className="shapes">
              <div className="smallcase-logo-triangle solo-triangle"></div>
              <div className="rectangle"></div>
              <div className="circle"></div>
          </div>
        </div >
  );
};

export default Loading;
