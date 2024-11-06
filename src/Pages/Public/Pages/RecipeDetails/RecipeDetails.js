import "./RecipeDetails.css";
import { Link, useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getData } from "../../../../axiosConfig/API";

export default function RecipeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [singleRecipe, setSingleRecipe] = useState({});
  const [loading, setLoading] = useState(false);

  const [newComment, setNewComment] = useState({
    id: 1,
    name: "islam",
    image: "Assets/images/people/user.jpg",
    comment: "",
    rate: 2,
  });

  const fetchRecipes = useCallback(
    async (id) => {
      setLoading(false);

      try {
        const result = await getData("recipes");
        setRecipes(result);
        if (id) {
          let recipe = result.find((recipe) => recipe.id === parseInt(id));
          setSingleRecipe(recipe);
        }
        setTimeout(() => setLoading(!loading), 500);
      } catch (error) {
        setTimeout(() => setLoading(!loading), 500);
        console.error(error.response || error.message);
      }
    },
    [loading]
  );

  useEffect(() => {
    fetchRecipes(id);
  }, [id, fetchRecipes]);

  const handleAddItem = (item) => {
    let newItem = {
      id: item.id ?? 0,
      name: item.name ?? "null",
      image: item.image ?? "null",
      price: parseFloat(item.price) ?? 0,
      quantity: item.quantity ?? 0,
    };

    let cartCount = document.getElementById("cart");
    cartCount.classList.add("added");
    setTimeout(() => cartCount.classList.remove("added"), 140);
    dispatch({ type: "ADD_ITEM", payload: newItem });
  };

  const createDate = () => {
    let date = new Date();
    let years = date.getFullYear();
    let months = date.getMonth() + 1;
    let days = date.getDate();
    return `${years}/${months}/${days}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value, date: createDate() });
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

  const handleSubmit = () => {
    if (newComment.comment) {
      setSingleRecipe((prev) => ({
        ...prev,
        reviews: [...prev.reviews, { ...newComment }],
      }));

      setNewComment({ ...newComment, comment: "", rate: 2 });
    }
  };

  if (!loading) return <p>loading...</p>;

  return (
    <div className="RecipeDetails">
      <div className="container">
        <h2>Details Recipe</h2>

        <div className="row">
          <div className="image">
            <img
              src={require(`../../../../${singleRecipe.image}`)}
              alt={singleRecipe.name}
              loading="lazy"
            />
          </div>

          <div className="information">
            <span>-{singleRecipe.mealType}-</span>
            <h3 className="title">{singleRecipe.title}</h3>
            <div className="description">{singleRecipe.description}</div>
            <div className="cookingTime">
              cook on low for {singleRecipe.cookingTime} minutes
            </div>

            <div className="price_and_rating">
              <div className="price">
                <b>price: </b>
                <span>${singleRecipe.price}</span>
              </div>

              <div className="rating">
                <b>rating: </b>
                <span>
                  {singleRecipe.rating}
                  <i className="fas fa-star"></i>
                </span>
              </div>
            </div>

            <div className="action">
              <button
                className="btn btnActive btnAddOrder"
                onClick={() => handleAddItem(singleRecipe)}
              >
                add order
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <div id="modelRate" className="modelRate">
          <form
            id="modelForm"
            className="modelForm"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="comment">
              <textarea
                name="comment"
                id="comment"
                value={newComment.comment}
                onChange={(e) => handleChange(e)}
                placeholder="write's someThing rate about this recipe!"
              ></textarea>
            </div>

            <div className="rating">
              <div className="rate">
                {Array.from({ length: 5 }).map((_, index) => (
                  <i
                    key={index}
                    data-rate={index + 1}
                    className={`fa-star ${
                      index < newComment.rate ? "fas" : "far"
                    }`}
                    onClick={(e) => handleRating(e)}
                  ></i>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className={`send ${newComment.comment === "" ? "disabled" : ""}`}
              onClick={handleSubmit}
            >
              <i className="fas fa-send"></i>
              send
            </button>
          </form>
        </div>

        <div className="reviews">
          <h2>reviews</h2>
          {singleRecipe.reviews.length > 0 ? (
            singleRecipe.reviews.map((review, index) => (
              <div className="review" key={index}>
                <div className="image">
                  <img
                    src={require(`../../../../${review.image}`)}
                    alt={review.name}
                    loading="lazy"
                  />
                </div>

                <div className="text">
                  <div className="head">
                    <div className="name">{review.name}</div>
                    <div className="rate">
                      {review.rate}
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                  <small className="date">{review.date}</small>
                  <div>{review.comment}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="reviews">no reviews yet now</div>
          )}
        </div>

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
                    index < 3 && (
                      <div className="card" key={index}>
                        <div className="card-image">
                          <img
                            src={require(`../../../../${recipe.image}`)}
                            className="images"
                            alt="recipe"
                            loading="lazy"
                          />
                          <span className="rating">
                            <i className="fa-solid fa-star"></i>
                            {recipe.rating}
                          </span>
                        </div>

                        <div className="card-title">
                          <span className="name">{recipe.name}</span>
                          <span className="price">${recipe.price}</span>
                        </div>

                        <div className="card-body">
                          <div className="actions">
                            <button
                              className="btn btnActive add"
                              onClick={() => handleAddItem(recipe)}
                            >
                              add order
                              <i className="fa-solid fa-cart-plus"></i>
                            </button>

                            <Link
                              to={`/recipe-details/${recipe.id}`}
                              className="btn btnActive details"
                            >
                              details
                              <i className="fa-solid fa-bookmark"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
