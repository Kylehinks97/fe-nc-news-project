import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-project-lsdh.onrender.com/api",
});

export function fetchArticles() {
  return api
    .get("/articles/")
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err, "request error");
    });
}
export function fetchArticlesById(article_id) {
    return api.get(`/articles/${article_id}`)
    .then((result) => {
        return result
    }).catch((err) => {
        console.log(err, "request error");
    })
}
export function fetchCommentsByArticleId(article_id) {
    return api.get(`/articles/${article_id}/comments`)
    .then((result) => {
        return result
    }).catch((err) => {
        console.log(err, "request error");
    })
}
export function updateArticleVotes(direction, article_id) {
  if (direction === "up") {
    const upvoteObj = {}
    upvoteObj["inc_votes"] = 1
    return api.patch(`/articles/${article_id}`, upvoteObj)
    .then((result) => {
      return result
    }).catch((err) => {
      console.log("failed to upvote");
    })
  } else if (direction === "down") {
    const downvoteObj = {}
    downvoteObj["inc_votes"] = -1
    return api.patch(`/articles/${article_id}`, downvoteObj)
    .then((result) => {
      return result
    }).catch((err) => {
      console.log("failed to downvote");
    })
  }
}