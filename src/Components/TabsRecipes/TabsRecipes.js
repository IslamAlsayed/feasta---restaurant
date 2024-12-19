import "./TabsRecipes.css";
import React, { useCallback, useEffect, useState } from 'react';
import random from "../../Assets/images/icons/main-colors/cooking.png";
import breakfast from "../../Assets/images/icons/main-colors/menu.png";
import dinner from "../../Assets/images/icons/main-colors/daily.png";
import lunch from "../../Assets/images/icons/main-colors/dishes.png";
import dessert from "../../Assets/images/icons/main-colors/dinner.png";
import { randomIntArrayInRange } from "../../Store/helper";

export default function TabsRecipes({ data, setFilterRecipes }) {
    const [activeTab, setActiveTab] = useState("random");
    const [stateLength, setStateLength] = useState(9);
    const mealTypes = [
        { title: "random", icon: random },
        { title: "breakfast", icon: breakfast },
        { title: "dinner", icon: dinner },
        { title: "lunch", icon: lunch },
        { title: "dessert", icon: dessert }
    ];

    useEffect(() => {
        const handleResize = () => setStateLength(window.innerWidth <= 768 ? 3 : window.innerWidth <= 992 ? 6 : 9);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleFilter = useCallback((meal) => {
        setActiveTab(meal);
        const randomIds = randomIntArrayInRange(1, data.length, stateLength);

        let dataFilter = meal === "random"
            ? data.filter((recipe) => randomIds.includes(recipe.id))
            : data.filter((recipe) => recipe.mealType === meal && randomIds.includes(recipe.id));

        if (dataFilter.length < stateLength) {
            const remainingData = data.filter((recipe) => recipe.mealType === meal);
            dataFilter = [
                ...dataFilter,
                ...remainingData.filter((recipe) => !randomIds.includes(recipe.id)).slice(0, stateLength - dataFilter.length)
            ];
        }

        setTimeout(() => setFilterRecipes(dataFilter), 250);
    }, [data, setFilterRecipes, stateLength]);

    return (
        <div className="TabsRecipes2">
            {mealTypes.map((meal, index) => (
                <div key={index} onClick={() => handleFilter(meal.title)}
                    className={`tab ${activeTab === meal.title ? "active" : ""}`}>
                    <img src={meal.icon} alt={meal.title} loading="lazy" />
                    <span>{meal.title.toLowerCase()}</span>
                </div>))}
        </div>
    );
}
