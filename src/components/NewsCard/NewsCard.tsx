import React from "react";
import parse from "html-react-parser";
import "./NewsCard.css";

const NewsCard = ({ article }: any) => {

  return (
    <div className="news-card">
        <div className="news-card__image" style={{backgroundImage: `url(${article.urlToImage})`}}></div>
        <div className="news-card__content">
            <h3>{article.title}</h3>
            <p>{parse(article.description)}</p>
            <a href={article.url} target="_blank" rel="noreferrer">Read More</a>
        </div>
    </div>
  );
};

export default NewsCard;
