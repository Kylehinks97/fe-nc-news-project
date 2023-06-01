import { useParams } from "react-router-dom";
import { fetchArticlesById, updateArticleVotes } from "./utils";
import { useEffect, useState } from "react";
import Comments from "./Comments.jsx";

export default function Article() {
  const [article, setArticle] = useState([]);
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [voteCount, setVoteCount] = useState(10);
  const [voteDirection, setVoteDirection] = useState(null);
  const [failedVote, setFailedVote] = useState(null);

  useEffect(() => {
    fetchArticlesById(article_id).then((result) => {
      setArticle(result.data.article);
      setIsLoading(false);
    });
  }, [article_id]);

  function handleVote(direction) {
    setVoteCount((currentCount) => {
      if (direction === "up") {
        return currentCount + 1;
      } else {
        return currentCount - 1;
      }
    });
    setVoteDirection(direction);
  }

  useEffect(() => {
    if (voteDirection === "up") {
      updateArticleVotes("up", article_id)
        .catch((err) => {
          setFailedVote(true);
        });
    } else if (voteDirection === "down") {
      updateArticleVotes("down", article_id)
        .catch((err) => {
          setFailedVote(true);
        });
    }
  }, [voteCount, voteDirection]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>{article.title}</h3>
          <h4>by {article.author}</h4>
          <img src={article.article_img_url}></img>
          <p>{article.body}</p>
          {failedVote && <p>Vote failed, sorry :L</p>}
          <p>Do you like this article?</p>
          <p>Votes: {voteCount}</p>
          <button className="vote-button" onClick={() => handleVote("up")}>
            ↑
          </button>
          <button className="vote-button" onClick={() => handleVote("down")}>
            ↓
          </button>
        </>
      )}
      <Comments />
    </>
  );
  
}
