import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { processClimb, getCragInfo } from '../../../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from '../../../operations/Operations';

const Crag = () => {
    const location = useLocation();
    const chosenCrag = location.state.chosenCrag;

    let navigate = useNavigate();

    const [climbs, setClimbs] = useState([]);

    const [climbsToSearch, setClimbsToSearch] = useState('');
    const [possibleClimbs, setPossibleClimbs] = useState([]);

    const searchClimb = (input) => {
        setClimbsToSearch(input);
    }

    const linkToClimb = (climb) => {
        navigate('/SearchAreas/SearchCrags/SearchClimbs/Climb', {
            state: {
                chosenClimb: climb,
            }
        })
    }

    useEffect(() => {
        const climbsToDisplay = [];
        getCragInfo(chosenCrag.crag)
            .then((resolvedClimbs) => {
                for (let climb of resolvedClimbs) {
                        climbsToDisplay.push(climb)
                    }
                const sortedClimbsByAscents = climbsToDisplay.sort((ascent1 ,ascent2) => {
                    return ((ascent2.numberoflogs) - (ascent1.numberoflogs));
                });
                setClimbs(sortedClimbsByAscents);
            })
    }, [])

    useEffect(() => {
        if (climbsToSearch !== '') {
            const trimClimbs = trimSentence(climbsToSearch)
            const trimAndCapClimbs = capitalizeFirstLetter(trimClimbs);
            const possibleClimbs = processClimb(trimAndCapClimbs);
            possibleClimbs.then((resolvedClimbs) => {
                const filteredClimbs = resolvedClimbs.filter((climb) => (climb.crag === chosenCrag.crag))
                const sortedClimbsByAscents = filteredClimbs.sort((ascent1 ,ascent2) => {
                    return ((ascent2.numberoflogs) - (ascent1.numberoflogs));
                });
                setPossibleClimbs(sortedClimbsByAscents);
            });
        }
    }, [climbsToSearch]);

    const sortByAscents = () => {
        const sortedClimbsByAscents = climbs.sort((ascent1 ,ascent2) => {
            return ((ascent2.numberoflogs) - (ascent1.numberoflogs));
        });
        setClimbs(sortedClimbsByAscents)
    }

    const sortByRating = () => {
        const sortedClimbsByRating = climbs.sort((ascent1 ,ascent2) => {
            return ((ascent2.averagerating) - (ascent1.averagerating));
        });
        setClimbs(sortedClimbsByRating)
    }

    const sortByGrade = () => {
        const sortedClimbsByGrade = climbs.sort((ascent1 ,ascent2) => {
            return ((ascent2.grade) - (ascent1.grade));
        });
        setClimbs(sortedClimbsByGrade)
    }

    return (
        <div>
            <h2>{chosenCrag.crag}</h2>
            <h3>Climbs</h3>
            <div>Search Climbs</div>
            <input type='text' onChange={(e) => searchClimb(e.target.value)}></input>
            <div>
                {possibleClimbs.map((climb, index) => {
                    return <div key={index} onClick={() => linkToClimb(climb)}>{climb.climb}</div>
                })}
            </div>
            <div>
                <p>Sort by:</p>
                <p onClick={sortByAscents}>Ascents</p>
                <p onClick={sortByRating}>Rating</p>
                <p onClick={sortByGrade}>Grade</p>
            </div>
            <ul>
                {climbs.map((climb, index) => {
                    return <li key={index} onClick={() => linkToClimb(climb)}>{climb.climb} {climb.numberoflogs}</li>
                })}
            </ul>
        </div>
    )
}

export default Crag;