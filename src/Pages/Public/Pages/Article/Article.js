import "./Article.css";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { addData, deleteData, getData } from "../../../../axiosConfig/API";
import { USER_HELPER } from "../../../../Store/helper";
import Article2, { handleArticleLike, handleReturnIsLike } from "../../../../Components/Article/Article";
import Comment from "../../../../Components/Comment/Comment";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const [articles, setArticles] = useState([]);
  const [newComment, setNewComment] = useState({ comment: false, client_id: "", article_id: "" });
  const [lengthComment, setLengthComment] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNewComment((prev) => ({ ...prev, client_id: parseInt(USER_HELPER.id), article_id: parseInt(id) }))
  }, [id]);

  const fetchArticles = useCallback(async (id) => {
    setLoading(false);

    try {
      const result = await getData("articles");

      if (result.status === 200 && result.result && result.result.length > 0) {
        const articleId = id ? parseInt(id) : 1;
        setArticle(result.result.find(article => parseInt(article.id) === articleId));

        const otherArticles = result.result.filter(article => parseInt(article.id) !== articleId);
        setArticles(otherArticles.slice(0, 6));
      }

      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.error(error)
    }
  }, []);

  useEffect(() => {
    if (id) fetchArticles(id);
  }, [id, fetchArticles]);

  const handleNewCommentChange = async () => {
    try {
      const response = await addData(`article_comments`, newComment);
      if (response.status === 200) {
        setNewComment((prev) => ({ ...prev, comment: false }));

        let updateComment = article.article_comments;
        updateComment.unshift(response.data);
        article.article_comments_count++;
        setArticle({ ...article, article_comments: updateComment });
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message, "error");
    }
  }

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
          const response = await deleteData(`article_comments/${id}`);

          if (response.status === 200) {
            let updateComments = article.article_comments.filter((comment) => parseInt(comment.id) !== parseInt(id));
            article.article_comments_count--;
            setArticle({ ...article, article_comments: updateComments });

            Swal.fire("Deleted!", response.result, "success");
          }
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.result, "error");
        }
      }
    });
  }

  if (!loading) return;

  return (
    <div className="AllArticle">
      <div className="container">

        <div className="main-article">
          <div className="article-img">
            <img src={article.image} alt={article.title} loading="lazy" />
          </div>

          <div className="article-info">
            <div className="article-text">
              <small>{article.updated_at}, admin</small>
              <b>{article.title}</b>
            </div>

            <div className="article-react">
              <span onClick={() => setNewComment((prev) => ({ ...prev, comment: true }))}>
                <i className="fas fa-message"></i> {article.article_comments.length}
              </span>

              <span className={handleReturnIsLike(article) ? "like" : ""} onClick={(e) => handleArticleLike(e.target, article, setArticles)}>
                <i className="fas fa-heart"></i> {article.article_likes.length}
              </span>
            </div>
          </div>

          <div className="article-description">{article.description}</div>
        </div>

        {newComment.comment !== false &&
          <div className="createComment">
            <textarea name="comment" id="comment" onChange={(e) => setNewComment((prev) => ({ ...prev, comment: e.target.value }))} placeholder="write comment..."></textarea>
            <button className="btn btnActive details" onClick={() => handleNewCommentChange()}><i className="far fa-message"></i> send</button>
          </div>}

        {article.article_comments.length > 0 &&
          <div className="comments">
            <h2>{article.article_comments.length} comments</h2>

            {article.article_comments.map((comment, index) => index < lengthComment &&
              <Comment key={index} data={comment} table="article_comments" setArticle={setArticle} />)}

            {article.article_comments.length - lengthComment > 0 &&
              <p className="more_comments" onClick={() => setTimeout(() => setLengthComment(lengthComment + 5), 1000)}>more comments...</p>}
          </div>}

        {articles.length > 0 && (
          <>
            <h2>other articles:-</h2>

            <div id="articles" className="articles">
              {articles.map((article, index) => <Article2 key={index} data={article} setArticles={setArticles} />)}
            </div>
          </>)}
      </div>
    </div>
  );
}