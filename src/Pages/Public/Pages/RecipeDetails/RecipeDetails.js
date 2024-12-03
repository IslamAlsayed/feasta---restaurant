import "./RecipeDetails.css";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_ITEM_HELPER } from "../../../../Store/helper";
import Swal from "sweetalert2";
import { addData, deleteData, getData, storageURL, updateData } from "../../../../axiosConfig/API";
import { getUser, isAuth } from "../../../../axiosConfig/Auth";

export default function RecipeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [recipe, setRecipe] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [requestUpdate, setRequestUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [userAuth, setUserAuth] = useState(false);
  const [absoluteImage, setAbsoluteImage] = useState();
  const [newComment, setNewComment] = useState({
    id: "",
    name: "",
    comment: "",
    rate: 2,
    stock_id: "",
    client_id: "",
  });

  useEffect(() => {
    const fetch = getUser();
    setUser(JSON.parse(fetch));
    setUserAuth(isAuth());

    if (user) {
      setNewComment({ ...newComment, name: user.name, client_id: user.id, stock_id: id });
    }
  }, [location, newComment, user, id]);

  const fetchRecipes = useCallback(async (id) => {
    setLoading(false);

    try {
      const result = await getData("recipes");
      if (result.status === 200) {
        setRecipes(result.result.slice(0, 3));
        if (id) {
          let recipe = result.result.find((recipe) => recipe.id === parseInt(id));
          setRecipe(recipe);
        }
        setTimeout(() => setLoading(true), 500);
      }
    } catch (error) {
      setTimeout(() => setLoading(true), 500);
    }
  }, []);

  const fetchRecipeReviews = useCallback(async (id) => {
    try {
      const result = await getData(`recipe/${id}/comments`);
      console.log(result.result)
      if (result.status === 200) {
        setReviews(result.result);
      }
    } catch (error) {
    }
  }, []);

  useEffect(() => {
    fetchRecipes(id);
    fetchRecipeReviews(id);
  }, [id, fetchRecipes, fetchRecipeReviews]);

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
    let userRate = parseInt(e.target.dataset.rate);

    rates.forEach((rate) => {
      rate.classList.add("far");
      rate.classList.remove("fas");
      if (rate.dataset.rate <= userRate) {
        rate.classList.add("fas");
        setNewComment({ ...newComment, rate: userRate });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.comment) {
      try {
        let requestInput = document.getElementById("requestUpdate");
        let response;

        if (requestInput && requestInput.value === "update") {
          response = await updateData(`recipe/${newComment.id}/comments`, newComment);
        } else {
          response = await addData(`recipe/comments`, newComment);
        }

        if (response.status === 200) {
          let comment = response.data;

          if (requestInput && requestInput.value === "update") {
            setReviews((prev) => {
              return prev.map((p) => (p.id === comment.id ? comment : p));
            });
          } else {
            setReviews((prev) => [...prev, comment]);
          }

          setNewComment({ ...newComment, comment: "", rate: 2, client_id: user.id, stock_id: id });
          Swal.fire("Saved!", response.result, "success");
        }
      } catch (error) {
        Swal.fire("Error!", error.response?.data?.message, "error");
      }
    }
  };

  const handleUserAction = (e) => {
    let list = e.target.nextElementSibling;
    let parentEdit = e.target.parentElement;
    let comment_id = parentEdit.dataset.id;
    let btnEdit = list.querySelector(".btnEdit");
    let btnDelete = list.querySelector(".btnDelete");

    list.classList.toggle("show");

    btnEdit.addEventListener("click", () => {
      let comment = reviews.find(review => review.id === parseInt(comment_id));
      list.classList.remove("show");
      setRequestUpdate(true);

      setNewComment({
        id: comment.id,
        name: comment.name,
        comment: comment.comment,
        rate: comment.rate,
        stock_id: comment.stock_id,
        client_id: comment.client_id,
      });
    });

    btnDelete.addEventListener("click", async (e) => {
      e.preventDefault();

      try {
        const response = await deleteData(`recipe/${comment_id}/comments`);

        if (response.status === 200) {
          list.classList.remove("show");

          setReviews((prev) => {
            const newReviews = prev.filter((p) => parseInt(p.id) !== parseInt(comment_id));
            return newReviews;
          });

          Swal.fire("Deleted!", response.result, "success");
        }
      } catch (error) {
        Swal.fire("Error!", error.response?.data?.result, "error");
      }
    });

    const handleClickOutside = (event) => {
      if (!parentEdit.contains(event.target)) {
        list.classList.remove("show");
        document.removeEventListener("click", handleClickOutside);
      }
    };

    document.addEventListener("click", handleClickOutside);

    window.addEventListener("scroll", () => {
      list.classList.remove("show");
    });
  };

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
              </div>
            }
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
                  {recipe.rating}
                  <i className="fas fa-star"></i>
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

        {!userAuth && (
          <div className="log_in_to_comment">Log in to comment.</div>
        )}

        {userAuth && (
          <div id="modelRate" className="modelRate">
            <form id="modelForm" className="modelForm"
              onSubmit={(e) => e.preventDefault()}>

              {requestUpdate &&
                <>
                  <input type="hidden" name="comment_id" id="comment_id" value={newComment.id} />
                  <input type="hidden" name="requestUpdate" id="requestUpdate" value={requestUpdate ? "update" : "add"} />
                </>
              }

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
                    </i>
                  ))}
                </div>
              </div>

              <button type="submit" onClick={handleSubmit} className={`send ${newComment.comment === "" ? "disabled" : ""}`}>
                <i className="fas fa-send"></i>
                send
              </button>
            </form>
          </div>
        )}

        <div className="reviews">
          {userAuth && <h2>reviews <span>{reviews.length}</span></h2>}

          {reviews.length > 0 &&
            reviews.map((review, index) => (
              <div className="review" key={index} id={review.id}>
                <div className="image">
                  <img src={review.image ? storageURL + review.image : storageURL + "clients/user.jpg"}
                    alt={review.name} loading="lazy" />
                </div>

                <div className="text">
                  <div className="head">
                    <div className="profile">
                      <div className="name">{review.name}</div>
                      {user && review.client_id === user.id && (
                        <div className="edit" data-id={review.id}>
                          <i className="editAction fas fa-edit btnActive"
                            onClick={(e) => handleUserAction(e)}>
                          </i>

                          <ul className="list" id="list">
                            <li className="btnActive">
                              <span className="btnEdit">
                                edit
                                <i className="fas fa-edit"></i>
                              </span>
                            </li>
                            <li className="btnActive">
                              <span className="btnDelete">
                                delete
                                <i className="fas fa-trash"></i>
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="rate">
                      {review.rate}
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                  <small className="date">{review.updated_at}</small>
                  <div className="comment">{review.comment}</div>
                </div>
              </div>))
          }
        </div>

        {userAuth && reviews.length <= 0 &&
          <div className="reviews">
            There are no reviews yet, try it yourself.
          </div>
        }

        <div className="RandomRecipes">
          <div className="head">
            <h2>other recipes</h2>

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
                    <div className="btns">
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {recipes.length > 0 && (
              <div id="cards" className="cards">
                {recipes.map(
                  (recipe, index) =>
                    <div className="card" key={index}>
                      <div className="card-image">
                        <img src={recipe.image} className="images" alt={recipe.title} loading="lazy" />
                        <span className="rating">
                          <i className="fa-solid fa-star"></i>
                          {recipe.rating}
                        </span>
                      </div>

                      <div className="card-title">
                        <span className="name">{recipe.title}</span>
                        <span className="price">${recipe.price}</span>
                      </div>

                      <div className="card-body">
                        <div className="actions">
                          <button className="btn btnActive add" onClick={() => ADD_ITEM_HELPER(recipe, dispatch)} >
                            add order
                            <i className="fa-solid fa-cart-plus"></i>
                          </button>

                          <Link to={`/recipe-details/${recipe.id}`} className="btn btnActive details" >
                            details
                            <i className="fa-solid fa-bookmark"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
