import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { processArea } from '../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from '../operations/Operations';

const Areas = () => {
    let navigate = useNavigate();

    const [areasToSearch, setAreasToSearch] = useState('');
    const [possibleAreas, setPossibleAreas] = useState([]);

    const searchArea = (input) => {
        setAreasToSearch(input);
    }

    const linkToArea = (area) => {
        navigate('/SearchAreas/SearchCrags', {
            state: {
                chosenArea: area,
            }
        })
    }

    useEffect(() => {
        const trimAreas = trimSentence(areasToSearch)
        const trimAndCapAreas = capitalizeFirstLetter(trimAreas);
        const possibleAreas = processArea(trimAndCapAreas);
        possibleAreas.then((resolvedAreas) => {
            setPossibleAreas(resolvedAreas);
        });
    }, [areasToSearch]);

    return (
        <div>
            <h1>Areas</h1>
            <div>Search Area</div>
            <input type='text' onChange={(e) => searchArea(e.target.value)}></input>
            <div>
                {possibleAreas.map((area, index) => {
                    return <div key={index} onClick={() => linkToArea(area)}>{area.area}</div>
                })}
            </div>
        </div>
    )
}

export default Areas;