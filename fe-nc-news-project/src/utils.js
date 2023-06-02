import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-project-lsdh.onrender.com/api",
});

export function fetchArticles() {
  return api.get("/articles/").then((result) => {
    return result;
  });
}
export function fetchArticlesById(article_id) {
  return api.get(`/articles/${article_id}`).then((result) => {
    return result;
  });
}
export function fetchCommentsByArticleId(article_id) {
  return api.get(`/articles/${article_id}/comments`).then((result) => {
    return result;
  });
}
export function updateArticleVotes(obj, article_id) {
  return api.patch(`/articles/${article_id}`, obj).then((result) => {
    console.log(result.data.article.votes, "<-- in the util");
    return result;
  });
}
