import React from 'react';
import { useLocation } from "react-router-dom";
import './SearchResultsBox.css';

const SearchResults = () => {
    const location = useLocation();
    const searchResults= location.state.searchResults;

    return (
        <div className='searchResultsBox'>
            {searchResults.map((climb, index) => {
                return  <div key={index} className='searchResult'>
                            <div className='searchResultSubPart'>
                                <div className='searchResultMainInfo'>{climb.climb}</div>
                                <div className='searchResultSecInfo'>{climb.crag} - {climb.area} - {climb.country}</div>
                            </div>
                            <div className='searchResultSubPart'>
                                <div className='searchResultMainInfo'>{climb.grade}</div>
                                <div className='searchResultSecInfo'>{climb.type}</div>
                            </div>
                            <div className='searchResultSubPart'>
                                <div className='searchResultMainInfo'>{climb.averagerating} stars</div>
                                <div className='searchResultSecInfo'>{climb.numberoflogs} ascents</div>
                            </div>
                            <div className='searchResultsButtonContainer'>
                                <button className='searchResultsButton'>More Info</button>
                                <button className='searchResultsButton'>Tick it!</button>
                                <button className='searchResultsButton'>To do!</button>
                            </div>
                        </div>
            })}
        </div>
    )
}

export default SearchResults