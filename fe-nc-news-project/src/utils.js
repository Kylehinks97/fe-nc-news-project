import axios from "axios"

export function fetchArticles() {
    return axios.get(`https://nc-news-project-lsdh.onrender.com/api/articles/`).then((result) => {
        return result
    })
}