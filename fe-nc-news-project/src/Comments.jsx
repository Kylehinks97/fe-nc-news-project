import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommentsByArticleId, postComment, removeComment } from "./utils";
import Article from "./Article";
import { Link } from "react-router-dom";

export default function Comments({ username }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const { article_id } = useParams();
  const [emptyComment, setEmptyComment] = useState(false)
  const [loggedInYet, setLoggedInYet] = useState(null)

  useEffect(() => {
    if (username === "") {
      setLoggedInYet(false);
    } else {
      setLoggedInYet(true);
    }
  })
  const id = article_id;

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((result) => {
      setComments(result.data.comments);
      setIsLoading(false);
    });
  }, []);
  
  function submitComment(e) {
    e.preventDefault();
    if (commentText !== "") {
    setPosting(true);
    const commentToPost = {};
    commentToPost.author = username;
    commentToPost.body = commentText;
    
    postComment(article_id, commentToPost).then((result) => {
      const justPosted = result.data.comment;
      const newCommentArr = [justPosted[0], ...comments];
      setComments(newCommentArr.reverse());
      setPosting(false);
      setPosted(true);
      setTimeout(() => {
        setPosted(false);
      }, 3000);
      console.log(commentText);
      setCommentText("")
      console.log(commentText);
    });
  } else {
      
      setEmptyComment(true)
      setTimeout(() => {
        setEmptyComment(false)
      }, 3000)
    
  }
  }

console.log(loggedInYet);

  function handleChange(e) {
    const updatedCommentText = e.target.value;
    setCommentText(updatedCommentText);
    
  }

  function deleteComment(commentId) {
    removeComment(commentId).then((result) => {
      const newComments = comments.filter((comment) => comment.comment_id !== commentId);
      setComments(newComments);
      console.log(result);
    })
  }
  
  
  let reversedComments = [...comments].reverse();

  return (
    <>
      {isLoading ? (
        <p>Loading Comments...</p>
      ) : (
        <>
      
          {posting && username !== "" && <p>Posting comment, please wait...</p>}
          {posted && <p>Posted, thanks for waiting</p>}
          {emptyComment && <p>Cannot post empty comments!</p>}
          {loggedInYet ? <form>
            <label htmlFor="comment-input">Post Comment:</label>
            <input value={commentText} id="comment-input" onChange={handleChange}></input>
            <button onClick={submitComment}>Submit</button>
          </form> : <p><Link to={"/"}><span>Log in</span></Link> to join the discussion!</p>}
          

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
                  {username === comment.author && <button onClick={() => deleteComment(comment.comment_id)}>X</button>}
                  
                </section>
              );
            })
          )}
        </>
      )}
    </>
  );
}
