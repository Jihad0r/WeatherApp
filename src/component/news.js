import React, { useState, useEffect } from "react";
import { Navbar } from "./navbar";

export const News = () => {
  const [articles, setArticles] = useState([]);
  const YOUR_API_KEY = "q_AKvWejByTIvljNx0WckuJP9cYVqbWzsj_RX--Iah39P61W";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://api.currentsapi.services/v1/latest-news?category=technology&apiKey=${YOUR_API_KEY}`
        );
        const data = await response.json();

        const filteredArticles = await Promise.all(
          data.news.map(async (article) => {
            if (!article.image || article.image === "None") {
              return null;
            }

            // Create a new image element to check its dimensions
            const img = new Image();
            img.src = article.image;

            // Return a promise that resolves to the article if the width is acceptable
            return new Promise((resolve) => {
              img.onload = () => {
                if (img.width >= 1000) {
                  resolve(article);
                } else {
                  resolve(null);
                }
              };
              img.onerror = () => resolve(null);
            });
          })
        );

        // Filter out null values
        const validArticles = filteredArticles.filter((article) => article !== null);
        setArticles(validArticles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="all_news">
        {articles.map((article, index) => (
          <a className="news" key={index} href={article.url}>
            <img src={article.image} alt="news" />
            <div className="text">
              <h4>{article.title}</h4>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
