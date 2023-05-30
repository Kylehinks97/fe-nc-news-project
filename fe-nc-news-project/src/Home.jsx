import { useEffect, useState } from "react";
import { fetchArticles } from "./utils.js";
// import { Link } from "react-router-dom";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(() => {
      setArticles();
    });
  }, []);

  return (
    <>
      {/* <ul>
        {articles.map(
          ({ article_id, title, author, votes, article_img_url }) => {
            <Link key={article_id} to={`/items/${article_id}`}>
              <li onClick={handleClick}>
                <img
                  className="article-image"
                  src={article_img_url}
                  alt={title}
                ></img>
                <span>
                  {title} by {author} • {votes}
                </span>
              </li>
            </Link>;
          }
        )}
      </ul> */}
    </>
  );
}
