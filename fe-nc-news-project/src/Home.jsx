import { useEffect, useState } from "react";
import { fetchArticles } from "./utils.js";
import { Link } from "react-router-dom";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(({ data }) => {
      setArticles(data.articles);
    });
  }, []);

  function handleClick() {
    setArticles();
  }

  return (
    <>
      <ul>
        {articles.map(
          ({ article_id, title, author, votes, article_img_url }) => {
            return (
              <Link key={article_id} to={`/articles/${article_id}`}>
                <li>
                  <img
                    className="article-image"
                    src={article_img_url}
                    alt={title}
                  ></img>
                  <span>
                    {title}
                    <br></br>
                    <br></br>by {author} • Votes: {votes}
                  </span>
                </li>
              </Link>
            );
          }
        )}
      </ul>
    </>
  );
}
