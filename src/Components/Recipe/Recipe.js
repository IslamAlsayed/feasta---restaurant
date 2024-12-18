import "./Recipe.css";
import React from 'react';
import { Link } from 'react-router-dom'
import { ADD_ITEM_HELPER, } from '../../Store/helper';

export default function Recipe({ data, dispatch }) {
    return (
        <div className="Recipe">
            <div className="recipe-image">
                <img src={data.image} className="images" alt={data.title} loading="lazy" />
                <span className="rating">
                    <i className="fa-solid fa-star"></i>
                    {data.rating}
                </span>
            </div>

            <div className="recipe-title">
                <span className="name">{data.title}</span>
                <span className="price">${data.price}</span>
            </div>

            <div className="recipe-body">
                <div className="actions">
                    <button className="btn btnActive add" onClick={() => ADD_ITEM_HELPER(data, dispatch)}>
                        add order
                        <i className="fa-solid fa-cart-plus"></i>
                    </button>

                    <Link to={`/recipe-details/${data.id}`} className="btn btnActive details">
                        details
                        <i className="fa-solid fa-bookmark"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}
