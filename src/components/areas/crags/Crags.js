import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { getAreaInfo } from '../../firebase/Firebase';
import './Crags.css';
import CragsSearchModal from './CragsSearchModal';

const Crags = () => {
    const location = useLocation();
    const chosenArea = location.state.chosenArea;

    let navigate = useNavigate();

    const [searching, setSearching] = useState(false);

    const [crags, setCrags] = useState([]);

    const [cragsToSearch, setCragsToSearch] = useState('');

    const searchCrag = (input) => {
        if (input !== '') {
            setSearching(true);
            setCragsToSearch(input);
        } else {
            setSearching(false)
            setCragsToSearch('');
        }
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
        getAreaInfo(chosenArea)
            .then((resolvedCrags) => {
                for (let crag of resolvedCrags) {
                    if (!avoidCragDuplicates.includes(crag.crag)) {
                        avoidCragDuplicates.push(crag.crag)
                        cragsToDisplay.push(crag)
                    }
                setCrags(cragsToDisplay);
                }
            })
    }, [])

    return (
        <main className='areasBox'>
            <h2 className='areasTitle'>{chosenArea}</h2>
            <div className = 'areasSearchBox'>
                <div className="areasInputBox">
                    <span className="material-symbols-sharp areasSearchSymbol">search</span>
                    <input type='text' onChange={(e) => searchCrag(e.target.value)} className="areasInput"/>
                </div>
                <div className='areasResultsBox'>
                    {searching? <CragsSearchModal data={cragsToSearch} consideredArea={chosenArea}/> : null}
                </div>
            </div>
            <div className='cragsBox'>
                {crags.map((climb, index) => {
                        return <div className='goodClimb' key={index} onClick={() => linkToCrag(climb.crag)}>
                                    <div className='goodClimbTop'>{climb.crag}</div>
                                    <div className='goodClimbBottom'>{climb.area} - {climb.country}</div>
                                </div>
                })}
            </div>
        </main>
    )
}

export default Crags;