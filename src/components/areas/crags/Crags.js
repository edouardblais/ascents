import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { processCrag } from '../../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from '../../operations/Operations';

const Crags = () => {
    const location = useLocation();
    const chosenArea = location.state.chosenArea;

    let navigate = useNavigate();

    const [cragsToSearch, setCragsToSearch] = useState('');
    const [possibleCrags, setPossibleCrags] = useState([]);

    const searchCrag = (input) => {
        setCragsToSearch(input);
    }

    const linkToCrag = (crag) => {
        navigate('/SearchAreas/SearchCrags/SearchClimbs', {
            state: {
                chosenCrag: crag,
            }
        })
    }

    useEffect(() => {
        const trimCrags = trimSentence(cragsToSearch)
        const trimAndCapCrags = capitalizeFirstLetter(trimCrags);
        const possibleCrags = processCrag(trimAndCapCrags);
        possibleCrags.then((resolvedCrags) => {
            setPossibleCrags(resolvedCrags);
        });
    }, [cragsToSearch]);

    return (
        <div>
            <h2>{chosenArea.area}</h2>
            <div>Search Crags</div>
            <input type='text' onChange={(e) => searchCrag(e.target.value)}></input>
            <div>
                {possibleCrags.map((crag, index) => {
                    return <div key={index} onClick={() => linkToCrag(crag)}>{crag.crag}</div>
                })}
            </div>
        </div>
    )
}

export default Crags;