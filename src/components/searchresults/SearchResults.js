import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, addClimbToTodoList } from '../firebase/Firebase';
import AddAscentModal from '../addascent/AddAscentModal';
import './SearchResults.css';

const SearchResults = () => {
    const location = useLocation();
    const searchResults= location.state.searchResults;
    const navigate = useNavigate();

    const [user, loading, error] = useAuthState(auth);
    const [displayModal, setDisplayModal] = useState(null)

    const showAddAscentModal = (climb) => {
        if (user) {
            setDisplayModal(climb)
        } else {
            alert('Please sign in or register to tick a climb!')
        }
    };

    const addToToDo = (climb) => {
        if (user) {
            addClimbToTodoList(climb, user.email)
        } else {
            alert('Please sign in or register to add a climb to your to-do list!')
        }
    }

    if (loading) {
        return (
          <div>
            <p>Initialising User...</p>
          </div>
        );
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }

    const seeClimb = (climbinfo) => {
        navigate('/SearchAreas/SearchCrags/SearchClimbs/Climb', {
            state: {
                chosenClimb:climbinfo
            }
        }) 
    }

    return (
        <main className='searchResultsBox'>
            {searchResults.map((climb, index) => {
                return  <div key={index} className='searchResultBox' onClick={() => seeClimb(climb)}>
                            <div className='searchResultSubBox'>
                                <div className='searchResultImportantInfoPart'>
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
                            </div>
                            <div className='searchResultsButtonContainer'>
                                <button className='searchResultsButton' onClick={() => showAddAscentModal(climb)}>Tick it!</button>
                                <button className='searchResultsButton' onClick={() => addToToDo(climb)}>To do!</button>
                            </div>
                            {displayModal===climb? <AddAscentModal climb={climb} useremail={user.email}/> : null}
                        </div>
            })}
        </main>
    )
}

export default SearchResults