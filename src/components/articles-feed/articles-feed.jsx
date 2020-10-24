import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { blackTechArticles } from './articles.config';
import './articles-feed.css';

const ArticleFeed = props => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(blackTechArticles).then(res => {
      setArticles(res.data.articles)
    })
  }, []);

  const uniqueArticles = Array.from(new Set(articles.map(article => article.title)))
    .map(title => {
      return articles.find(article => article.title === title)
    })

  return articles.length > 0 ? (
    uniqueArticles
      .map((article, index) => {
        return (
          <p className="article" key={index}>
            <span className={`article-header-${props.mode}`}>
              Published {article.author ? `by ${article.author}` : null} {moment(article.publishedAt).fromNow()}
            </span>
            <br />
            <a className={`article-title-${props.mode}`} href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </p>
        )
      })
  ) : 'Loading...'
}

export default ArticleFeed;
