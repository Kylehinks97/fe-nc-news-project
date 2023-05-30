import axios from "axios"

export function fetchArticles() {
    return axios.get(`https://nc-news-project-lsdh.onrender.com/api/articles/`).then((result) => {
        console.log(result, "RESULT");
    }).catch(() => {
        console.log("request error")
    })
}