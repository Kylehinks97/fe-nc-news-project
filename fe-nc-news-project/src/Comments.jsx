import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommentsByArticleId } from "./utils";
import Article from "./Article";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((result) => {
      setComments(result.data.comments);
    });
  }, []);

  return (
    <>
      <h4>Add Comment:</h4>
      <input></input>
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No Comments</p>
      ) : (
        comments.map((comment) => {
          const formattedDate = new Date(comment.created_at).toLocaleString();
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
  );
}
