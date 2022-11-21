import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchAllClimbs } from '../firebase/Firebase';
import './Areas.css';
import AreasSearchModal from './AreasSearchModal';

const Areas = () => {
    let navigate = useNavigate();
    let counter = 0;

    const [areas, setAreas] = useState([]);

    const [areasToSearch, setAreasToSearch] = useState('');
    const [searching, setSearching] = useState(false);

    const searchArea = (input) => {
        if (input !== '') {
            setSearching(true);
            setAreasToSearch(input);
        } else {
            setSearching(false)
            setAreasToSearch('');
        }
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

    const increment = () => {
        counter += 1;
    }

    return (
        <main className='areasBox'>
            <h2 className='areasTitle'>Areas</h2>
            <div className = 'areasSearchBox'>
                <div className="areasInputBox">
                    <span className="material-symbols-sharp areasSearchSymbol">search</span>
                    <input type='text' onChange={(e) => searchArea(e.target.value)} className="areasInput"/>
                </div>
                <div className='areasResultsBox'>
                    {searching? <AreasSearchModal data={areasToSearch}/> : null}
                </div>
            </div>
            <div className='goodClimbsBox'>
                {areas.map((climb, index) => {
                    increment();
                    if (counter <= 18) {
                        return <div className='goodClimb' key={index} onClick={() => linkToArea(climb.area)}>
                                    <div className='goodClimbTop'>{climb.area}</div>
                                    <div className='goodClimbBottom'>{climb.country}</div>
                                </div>
                        }
                })}
            </div>
        </main>
    )
}

export default Areas;