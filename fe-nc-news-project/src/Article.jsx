import { useParams } from "react-router-dom";
import { fetchArticlesById, updateArticleVotes } from "./utils";
import { useEffect, useState } from "react";
import Comments from "./Comments.jsx";

export default function Article({username}) {
  console.log(username);
  const [article, setArticle] = useState([]);
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [failedVote, setFailedVote] = useState(null);
  const [voteCount, setVoteCount] = useState(null);
  const [pressedUp, setPressedUp] = useState(false);
  const [pressedDown, setPressedDown] = useState(false);
  const [previousVote, setPreviousVote] = useState(null);

  useEffect(() => {
    fetchArticlesById(article_id).then((result) => {
      setArticle(result.data.article);
      setVoteCount(result.data.article.votes);
      setIsLoading(false);
    });
  }, [article_id]);

  function handleVote(direction) {
    let voteChange;
    if (direction === "up") {
      if (previousVote === "down") {
        voteChange = 2;
      } else {
        voteChange = 1;
      }
      setPressedUp(true);
      setPressedDown(false);
      setPreviousVote("up");
    } else {
      if (previousVote === "up") {
        voteChange = -2;
      } else {
        voteChange = -1;
      }
      setPressedUp(false);
      setPressedDown(true);
      setPreviousVote("down");
    }

    const voteObj = { inc_votes: voteChange };

    updateArticleVotes(voteObj, article_id)
      .then(() => {
        setVoteCount((currentCount) => currentCount + voteChange);
      })
      .catch((err) => {
        setFailedVote(true);
      });
  }

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
          <button
            disabled={pressedUp}
            className="vote-button-up"
            onClick={() => handleVote("up")}
          >
            ↑
          </button>
          <button
            disabled={pressedDown}
            className="vote-button-down"
            onClick={() => handleVote("down")}
          >
            ↓
          </button>
        </>
      )}
      <Comments username={username}/>
    </>
  );
}
