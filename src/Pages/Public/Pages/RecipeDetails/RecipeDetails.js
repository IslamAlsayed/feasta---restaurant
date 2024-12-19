import "./RecipeDetails.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_ITEM_HELPER, USER_HELPER } from "../../../../Store/helper";
import { addData, deleteData, getData, updateData } from "../../../../axiosConfig/API";
import { isAuth } from "../../../../axiosConfig/Auth";
import Swal from "sweetalert2";
import Recipe from "../../../../Components/Recipe/Recipe";

export default function RecipeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [recipe, setRecipe] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [comments, setComments] = useState([]);
  const [requestUpdate, setRequestUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientAuth, setClientAuth] = useState(false);
  const [absoluteImage, setAbsoluteImage] = useState();
  const [newComment, setNewComment] = useState({ comment: "", rate: 2, client_id: "", recipe_id: "" });

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuth();
      setClientAuth(authStatus)
    }
    checkAuth();
  }, [location]);

  useEffect(() => {
    setNewComment((prev) => ({ ...prev, client_id: USER_HELPER.id, recipe_id: parseInt(id) }));
  }, [id]);

  const fetchRecipes = useCallback(async (id) => {
    setLoading(false);

    try {
      const result = await getData("recipes");
      if (result.status === 200 && result.result && result.result.length > 0) {
        const recipeId = id ? parseInt(id) : 1;
        let getRecipe = result.result.find(recipe => parseInt(recipe.id) === recipeId);
        setRecipe(getRecipe);

        let recipesByMealType = result.result.filter(recipe => recipe.mealType === getRecipe.mealType);
        const otherRecipes = recipesByMealType.filter(recipe => parseInt(recipe.id) !== recipeId);

        setRecipes(otherRecipes.slice(0, 6));
        setLoading(true);
      }
    } catch (error) {
      setLoading(true);
    }
  }, []);

  const fetchRecipeComments = useCallback(async (id) => {
    try {
      const result = await getData(`recipe_comments/${id}`);
      if (result.status === 200) {
        setComments(result.result);
      }
    } catch (error) {
      console.error(error)
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchRecipes(id);
      fetchRecipeComments(id);
    }
  }, [id, fetchRecipes, fetchRecipeComments]);

  const handleAbsoluteImage = (image) => {
    setAbsoluteImage(image);
    document.body.style.overflow = 'hidden';
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.closest("#layout")) {
        setAbsoluteImage();
        document.body.style.overflow = 'visible';
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleRating = (e) => {
    let rates = document.querySelectorAll(".modelRate .rate .fa-star");
    let clientRate = parseInt(e.target.dataset.rate);

    rates.forEach((rate) => {
      rate.classList.add("far");
      rate.classList.remove("fas");
      if (rate.dataset.rate <= clientRate) {
        rate.classList.add("fas");
        setNewComment({ ...newComment, rate: clientRate });
      }
    });
  };

  const handleEditing = (e) => {
    let list = document.getElementById("list");
    let parentEdit = e.target.parentElement;
    let comment_id = parseInt(parentEdit.dataset.id);
    let btnEdit = list.querySelector(".btnEdit");

    if (list) list.classList.toggle("show");

    btnEdit.addEventListener("click", () => {
      let comment = comments.find(comment => comment.id === comment_id);
      if (list) list.classList.remove("show");
      setRequestUpdate(true);
      setNewComment((prev) => ({ ...prev, id: comment_id, comment: comment.comment, rate: comment.rate }));
    });

    const handleClickOutside = (event) => {
      if (!parentEdit.contains(event.target)) {
        if (list) list.classList.remove("show");
        document.removeEventListener("click", handleClickOutside);
      }
    };

    document.addEventListener("click", handleClickOutside);

    window.addEventListener("scroll", () => {
      if (list) list.classList.remove("show");
    });
  };

  const handleDeleteComment = async (id) => {
    let list = document.getElementById("list");

    try {
      const response = await deleteData(`recipe_comments/${id}`);

      if (response.status === 200) {
        const updateComments = comments.filter((comment) => parseInt(comment.id) !== parseInt(id));
        setComments(updateComments);

        list.classList.remove("show");

        Swal.fire("Deleted!", response.result, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.result, "error");
    }
  }

  const handleNewComment = async (e) => {
    e.preventDefault();

    if (newComment.comment) {
      try {
        let requestInput = document.getElementById("requestUpdate");
        let response;

        if (requestInput && requestInput.value === "update") {
          response = await updateData(`recipe_comments/${newComment.id}`, newComment);
        } else {
          response = await addData("recipe_comments", newComment);
        }

        if (response.status === 200) {
          let comment = response.data;
          setRequestUpdate(false);

          if (requestInput && requestInput.value === "update") {
            setComments((prev) => {
              return prev.map((p) => (p.id === comment.id ? comment : p));
            });
          } else {
            let updateComments = comments;
            updateComments.unshift(response.data);
            setComments(updateComments);
          }

          setNewComment({ ...newComment, comment: "", rate: 2, client_id: USER_HELPER.id, stock_id: id });
          Swal.fire("Saved!", response.result, "success");
        }
      } catch (error) {
        Swal.fire("Error!", error.response?.data?.message, "error");
      }
    }
  };

  const handleCancelComment = () => {
    setRequestUpdate(false);
    setNewComment({ comment: "", rate: 2, client_id: USER_HELPER.id, recipe_id: parseInt(id) });
  }

  if (!loading) return;

  return (
    <div className="RecipeDetails">
      <div className="container">
        <h2>Details Recipe</h2>

        <div className="row">
          <div className="image">
            <img src={recipe.image} alt={recipe.name} loading="lazy" onClick={() => handleAbsoluteImage(recipe.image)} />

            {absoluteImage &&
              <div className="absolute">
                <div className="layout" id="layout"></div>
                <img src={absoluteImage} alt={recipe.name} />
              </div>}
          </div>

          <div className="information">
            <span>-{recipe.mealType}-</span>
            <h3 className="title">{recipe.title}</h3>
            <div className="description">{recipe.description}</div>
            <div className="cookingTime">
              cook on low for {recipe.cookingTime} minutes
            </div>

            <div className="price_and_rating">
              <div className="price">
                <b>price: </b>
                <span>${recipe.price}</span>
              </div>

              <div className="rating">
                <b>rating: </b>
                <span>
                  <i className="fas fa-star"></i>
                  {recipe.rating}
                </span>
              </div>
            </div>

            <div className="action">
              <button className="btn btnActive btnAddOrder" onClick={() => ADD_ITEM_HELPER(recipe, dispatch)} >
                add order
                <i className="fas fa-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>

        {!clientAuth && <div className="log_in_to_comment">Log in to comment.</div>}

        {clientAuth && (
          <div id="modelRate" className="modelRate">
            <form id="modelForm" className="modelForm" onSubmit={(e) => handleNewComment(e)}>

              {requestUpdate && <>
                <input type="hidden" name="comment_id" id="comment_id" value={newComment.id} />
                <input type="hidden" name="requestUpdate" id="requestUpdate" value={requestUpdate ? "update" : "add"} />
              </>}

              <div className="comment">
                <textarea name="comment" id="comment" value={newComment.comment} onChange={(e) => handleChange(e)}
                  placeholder="write's someThing rate about this recipe!">
                </textarea>
              </div>

              <div className="rating">
                <div className="rate">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <i key={index} data-rate={index + 1}
                      className={`fa-star ${index < newComment.rate ? "fas" : "far"}`} onClick={(e) => handleRating(e)}>
                    </i>))}
                </div>
              </div>

              <button type="submit" className={`send ${newComment.comment === "" ? "disabled" : ""}`}>
                <i className="fas fa-send"></i>
                send
              </button>

              {requestUpdate &&
                <button className="cancel" onClick={() => handleCancelComment()}>
                  <i className="fas fa-send"></i>
                  cancel
                </button>}
            </form>
          </div>)}

        {clientAuth && comments.length > 0 &&
          <div className="comments">
            <h2>{comments.length} comments</h2>

            {comments.length > 0 && comments.map((comment, index) => (
              <div className="comment" key={index} id={comments.id}>
                <div className="image">
                  <img src={comment.client?.image} alt={comment.client?.name} loading="lazy" />
                </div>

                <div className="content">
                  <div className="head">
                    <div className="client">
                      <div>
                        <b>{comment.client?.name}</b>
                        <div className="profile">
                          {USER_HELPER && comment.client_id === USER_HELPER.id && (
                            <div className="edit" data-id={comment.id}>
                              <i className="editAction fas fa-ellipsis btnActive"
                                onClick={(e) => handleEditing(e)}>
                              </i>

                              <ul className="list" id="list">
                                <li className="btnActive">
                                  <span className="btnEdit">
                                    edit
                                    <i className="fas fa-edit"></i>
                                  </span>
                                </li>
                                <li className="btnActive">
                                  <span className="btnDelete" onClick={() => handleDeleteComment(comment.id)}>
                                    delete
                                    <i className="fas fa-trash"></i>
                                  </span>
                                </li>
                              </ul>
                            </div>)}
                        </div>
                      </div>
                      <span>{comment.updated_at}</span>
                    </div>

                    <div className="rate">
                      <i className="fas fa-star"></i>
                      {comment.rate}
                    </div>
                  </div>
                  <div className="review">{comment.comment}</div>
                </div>
              </div>
            ))}
          </div>}

        {clientAuth && comments.length <= 0 &&
          <div className="comments">
            There are no comments yet, try it yourself.
          </div>}

        <div className="RandomRecipes">
          <div className="head">
            <h2>other recipes:-</h2>

            <Link to="/all-recipes">
              all recipes <i className="fa-solid fa-up-right-from-square"></i>
            </Link>
          </div>

          <div className="random-recipe">
            {!recipes.length > 0 && (
              <div className="sky-loading">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="card" key={index}>
                    <div className="img"></div>
                    <div className="text"></div>
                    <div className="btns"><div></div><div></div></div>
                  </div>))}
              </div>)}

            {recipes.length > 0 && (
              <div id="recipes" className="recipes">
                {recipes.map((recipe, index) => <Recipe key={index} data={recipe} dispatch={dispatch} />)}
              </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
