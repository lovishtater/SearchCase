import React from "react";
import "./NewsCard.css";

interface Iarticle {
  title: string;
  excerpt: string;
  link: string;
  media: string;
}

const NewsCard = ({ article , key}: {
    article: Iarticle;
    key: number
} ) => {

  return (
    <div className="news-card" key={key}>
        <div className="news-card__image" style={{backgroundImage: `url(${article.media})`}}></div>
        <div className="news-card__content">
            <h3>{article.title}</h3>
        <p>{article.excerpt.slice(0, 100)}...</p>
            <a href={article.link} target="_blank" rel="noreferrer">Read More</a>
        </div>
    </div>
  );
};

export default NewsCard;
