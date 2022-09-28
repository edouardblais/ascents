import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { processCrag, displayCragsforChosenArea } from '../../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from '../../operations/Operations';

const Crags = () => {
    const location = useLocation();
    const chosenArea = location.state.chosenArea;

    let navigate = useNavigate();

    const [crags, setCrags] = useState([]);

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
        const cragsToDisplay = [];
        const avoidCragDuplicates = [];
        displayCragsforChosenArea(chosenArea.area)
            .then((resolvedCrags) => {
                console.log(resolvedCrags)
                for (let crag of resolvedCrags) {
                    if (!avoidCragDuplicates.includes(crag.crag)) {
                        avoidCragDuplicates.push(crag.crag)
                        cragsToDisplay.push(crag)
                    }
                setCrags(cragsToDisplay);
                }
            })
    }, [])

    useEffect(() => {
        const trimCrags = trimSentence(cragsToSearch)
        const trimAndCapCrags = capitalizeFirstLetter(trimCrags);
        processCrag(trimAndCapCrags)
            .then((resolvedCrags) => {
                const filteredCrags = resolvedCrags.filter((crag) => (crag.area === chosenArea.area))
                setPossibleCrags(filteredCrags);
        });
    }, [cragsToSearch]);

    return (
        <div>
            <h2>{chosenArea.area}</h2>
            <div>Search Crags</div>
            <div>
                {crags.map((crag, index) => {
                    return <div key={index} onClick={() => linkToCrag(crag)}>{crag.crag}</div>
                })}
            </div>
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