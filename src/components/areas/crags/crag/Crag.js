import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { processClimb } from '../../../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from '../../../operations/Operations';

const Crag = () => {
    const location = useLocation();
    const chosenCrag = location.state.chosenCrag;

    let navigate = useNavigate();

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
        const trimClimbs = trimSentence(climbsToSearch)
        const trimAndCapClimbs = capitalizeFirstLetter(trimClimbs);
        const possibleClimbs = processClimb(trimAndCapClimbs);
        possibleClimbs.then((resolvedClimbs) => {
            const filteredClimbs = resolvedClimbs.filter((climb) => (climb.crag === chosenCrag.crag))
            setPossibleClimbs(filteredClimbs);
        });
    }, [climbsToSearch]);

    return (
        <div>
            <h2>{chosenCrag.crag}</h2>
            <div>Search Climbs</div>
            <input type='text' onChange={(e) => searchClimb(e.target.value)}></input>
            <div>
                {possibleClimbs.map((climb, index) => {
                    return <div key={index} onClick={() => linkToClimb(climb)}>{climb.climb}</div>
                })}
            </div>
        </div>
    )
}

export default Crag;