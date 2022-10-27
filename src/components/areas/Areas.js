import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchAllClimbs } from '../firebase/Firebase';
import './Areas.css';
import AreasSearchModal from './AreasSearchModal';

const Areas = () => {
    let navigate = useNavigate();

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

    return (
        <div className='areasBox'>
            <h2 className='areasTitle'>Areas</h2>
            <div className = 'areasSearchBox'>
                <div className="topNavInputBox">
                    <span className="material-symbols-sharp areasSearchSymbol">search</span>
                    <input type='text' onChange={(e) => searchArea(e.target.value)} className="areasInput"/>
                </div>
                <div>
                    {searching? <AreasSearchModal data={areasToSearch}/> : null}
                </div>
            </div>
            <div>
                {areas.map((area, index) => {
                    return <div key={index} onClick={() => linkToArea(area)}>{area.area}</div>
                })}
            </div>
        </div>
    )
}

export default Areas;