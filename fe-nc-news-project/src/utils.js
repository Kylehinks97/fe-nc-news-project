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