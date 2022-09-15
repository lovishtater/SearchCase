import React from "react";
import "./NewsCard.css";

const NewsCard = ({ article , key}: any) => {

  return (
    <div className="news-card" key={key}>
        <div className="news-card__image" style={{backgroundImage: `url(${article.media})`}}></div>
        <div className="news-card__content">
            <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
            <a href={article.link} target="_blank" rel="noreferrer">Read More</a>
        </div>
    </div>
  );
};

export default NewsCard;
