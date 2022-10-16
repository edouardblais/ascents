import React from 'react';
import { useLocation } from "react-router-dom";

const SearchResults = () => {
    const location = useLocation();
    const searchResults= location.state.searchResults;

    return (
        <div>
            {searchResults.map((climb, index) => {
                return <div key={index}>{climb.climb}</div>
            })}
        </div>
    )
}

export default SearchResults