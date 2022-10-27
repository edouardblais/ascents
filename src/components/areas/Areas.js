import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchAllClimbs, processArea } from '../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from '../operations/Operations';
import './Areas.css';

const Areas = () => {
    let navigate = useNavigate();

    const [areas, setAreas] = useState([]);

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
        const avoidAreaDuplicates =[];
        const areasToDisplay = [];
        fetchAllClimbs()
            .then((resolvedClimbs) => {
                for (let climb of resolvedClimbs) {
                    if (!avoidAreaDuplicates.includes(climb.area)) {
                        avoidAreaDuplicates.push(climb.area)
                        areasToDisplay.push(climb)
                    }
                }
                setAreas(areasToDisplay)
            })
    }, [])

    useEffect(() => {
        const trimAreas = trimSentence(areasToSearch)
        const trimAndCapAreas = capitalizeFirstLetter(trimAreas);
        const possibleAreas = processArea(trimAndCapAreas);
        possibleAreas.then((resolvedAreas) => {
            setPossibleAreas(resolvedAreas);
        });
    }, [areasToSearch]);

    return (
        <div className='areasBox'>
            <h2 className='areasTitle'>Areas</h2>
            <div>Search Area</div>
            <div className="topNavInputBox">
                <span className="material-symbols-sharp areasSearchSymbol">search</span>
                <input type='text' onChange={(e) => searchArea(e.target.value)} className="topNavInput"/>
            </div>
            <div>
                {possibleAreas?.map((area, index) => {
                    return <div key={index} onClick={() => linkToArea(area)}>{area.area}</div>
                })}
            </div>
            <ul>
                {areas.map((area, index) => {
                    return <li key={index} onClick={() => linkToArea(area)}>{area.area}</li>
                })}
            </ul>
        </div>
    )
}

export default Areas;