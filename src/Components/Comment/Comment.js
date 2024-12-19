import "./Comment.css";
import React from 'react';
import Swal from "sweetalert2";
import { deleteData } from '../../axiosConfig/API';
import { USER_HELPER } from '../../Store/helper';

export default function Comment({ data, setArticle, table }) {
    const mainColor = getComputedStyle(document.documentElement).getPropertyValue('--toxic-color').trim();
    const redColor = getComputedStyle(document.documentElement).getPropertyValue('--red-color').trim();

    const handleDeleteComment = async (id) => {
        Swal.fire({
            title: "Delete!",
            text: "Are you sure you want to delete this record?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: mainColor,
            cancelButtonColor: redColor,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteData(`${table}/${id}`);

                    if (response.status === 200) {
                        let updateComments = data.article_comments.filter((comment) => parseInt(comment.id) !== parseInt(id));
                        data.article_comments_count--;
                        setArticle((prev) => ({ ...prev, article_comments: updateComments }));

                        Swal.fire("Deleted!", response.result, "success");
                    }
                } catch (error) {
                    Swal.fire("Error!", error.response?.data?.result, "error");
                }
            }
        });
    }

    return (
        <div className="Comment">
            <div className="comment-client">
                <img src={data.client?.image} alt={data.client?.name} loading="lazy" />
            </div>

            <div className="comment-content">
                <div className="comment-text">
                    <b>{data.client?.name}</b>
                    <small>{data.updated_at}</small>
                </div>

                <div className="comment-comment">{data.comment}</div>

                <div className="comment-react">
                    {USER_HELPER.id === data.client_id &&
                        <p className="btnActive" onClick={() => handleDeleteComment(data.id)}>
                            <i className="fas fa-trash"></i>
                        </p>}
                </div>
            </div>
        </div>
    )
}
