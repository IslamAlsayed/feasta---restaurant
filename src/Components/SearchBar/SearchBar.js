import "./SearchBar.css";
import React, { useEffect, useState } from "react";

export default function SearchBar({ data, setFilterRecipes }) {
    const [searchPrompt, setSearchPrompt] = useState("");
    const handleFilterDate = (e) => {
        e.preventDefault();
        const dataFilter = data.filter(row => row.title.toLowerCase().includes(searchPrompt.toLowerCase()));
        setFilterRecipes(dataFilter);
    }

    useEffect(() => {
        if (!searchPrompt) setFilterRecipes(data);
    }, [searchPrompt])

    return (
        <div className="SearchBar">
            <form className="inner" onSubmit={(e) => handleFilterDate(e)}>
                <div className="search-input">
                    <input type="text" name="search" id="search" placeholder="Search..."
                        value={searchPrompt} onChange={(e) => setSearchPrompt(e.target.value)} />

                    <button type="submit"><i className="fas fa-search"></i></button>
                </div>
            </form>
        </div>
    )
}
