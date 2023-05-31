import { useEffect, useState } from "react";
import { fetchArticles } from "./utils.js";
import { Link } from "react-router-dom";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
   useEffect(() => {
    fetchArticles().then(({ data }) => {
      setArticles(data.articles);
      setIsLoading(false)
    });
  }, []);

  function handleClick() {
    setArticles();
  }

  return (
    <>
    {isLoading ? <p>Loading...</p>:  <ul>
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
      </ul>}
    </>
  );
}
