import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommentsByArticleId, postComment } from "./utils";
import Article from "./Article";

export default function Comments({username}) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const { article_id } = useParams();

  const id = article_id

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((result) => {
      setComments(result.data.comments);
      setIsLoading(false);
    });
  }, [comments]);


  function submitComment(e) {
    e.preventDefault()
    setPosting(true)
    const commentToPost = {}
    commentToPost.author = username
    commentToPost.body = commentText
    postComment(article_id, commentToPost).then((result) => {
      const justPosted = result.data.comment
      const newCommentArr = [justPosted[0], ...comments]
      setComments(newCommentArr.reverse())
      setPosting(false)
      setPosted(true)
      setTimeout(() => {
        setPosted(false);
      }, 3000);
    })
  }

  function handleChange(e) {
    setCommentText(e.target.value)
    console.log(commentText);
  }

  const reversedComments = [...comments].reverse();

  return (
    <>
      {isLoading ? (
        <p>Loading Comments...</p>
      ) : (
        <>
        {posting && <p>Posting comment, please wait...</p>}
        {posted && <p>Posted, thanks for waiting</p>}
          <form>
            <label htmlFor="comment-input">Post Comment:</label>
            <input id="comment input"
            onChange={handleChange}
            ></input>
            <button onClick={submitComment}>Submit</button>
          </form>

          <h3>Comments</h3>
          {comments.length === 0 ? (
            <p>No Comments</p>
          ) : (
            reversedComments.map((comment) => {
              const formattedDate = new Date(
                comment.created_at
              ).toLocaleString();
              return (
                <section key={comment.comment_id}>
                  <h5>{comment.author}</h5>
                  <p>{comment.body}</p>
                  <p>Votes: {comment.votes}</p>
                  <p>Posted at: {formattedDate}</p>
                </section>
              );
            })
          )}
        </>
      )}
    </>
  );
}
