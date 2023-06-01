import { useParams } from "react-router-dom"
import { fetchArticlesById } from "./utils"
import { useEffect, useState } from 'react';


export default function Article() {
    const [article, setArticle] = useState([])
    const {article_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchArticlesById(article_id).then((result) => {
            setArticle(result.data.article)
            setIsLoading(false)
        })
    }, [article_id])

    
    return (
        <>
         {isLoading ? <p>Loading...</p> :
         <>
        <h3>{article.title}</h3>
        <h4>by {article.author}</h4>
        <img src={article.article_img_url}></img>
        <p>{article.body}</p>
        <p>Votes: {article.votes}</p>
        </>
    }
        </>
    )
}