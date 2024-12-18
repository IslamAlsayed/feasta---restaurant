import "./Article.css";
import React from 'react';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom'
import { addData, deleteData } from '../../axiosConfig/API';
import { USER_HELPER } from '../../Store/helper';

export const handleReturnIsLike = (article) => article.article_likes.some(like => like.client_id === USER_HELPER.id);

export const handleArticleLike = async (element, article, setArticles) => {
    let isLiked = handleReturnIsLike(article);

    try {
        let response;

        if (isLiked) {
            response = await deleteData(`article_likes/${article.id}/${USER_HELPER.id}`)
        } else {
            response = await addData(`article_likes`, { client_id: USER_HELPER.id, article_id: article.id });
        }

        if (response.status === 200) {
            if (isLiked) {
                article.article_likes = article.article_likes.filter(like => like.client_id !== USER_HELPER.id);
            } else {
                article.article_likes.push(response.data);
            }

            setArticles((prev) => [...prev, article]);

            element.classList.toggle('like');
        }
    } catch (error) {
        Swal.fire("Error!", error.response?.data?.message, "error");
    }
};

export default function Article({ data, setArticles }) {

    return (
        <div className="Article">
            <Link to={`/blogger/${data.id}`}>
                <div className="article-img">
                    <img src={data.image} alt={data.title} loading="lazy" />
                </div>
                <div className="article-info">
                    <small>{data.updated_at}, admin</small>
                    <p>{data.title}</p>
                    <p>{String(data.description).length > 90 ? String(data.description).slice(0, 90) + "..." : data.description}</p>
                </div>
            </Link>

            <div className="article-react">
                <Link to={`/blogger/${data.id}`}>
                    <i className="fa-solid fa-message"></i> {data.article_comments.length}
                </Link>

                <span className={handleReturnIsLike(data) ? "like" : ""} onClick={(e) => handleArticleLike(e.target, data, setArticles)}>
                    <i className="fa-solid fa-heart"></i> {data.article_likes.length}
                </span>
            </div>
        </div>
    )
}
