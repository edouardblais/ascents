import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { getCragInfo } from '../../../firebase/Firebase';
import ClimbsSearchModal from './ClimbsSearchModal';
import './Crag.css';

const Crag = () => {
    const location = useLocation();
    const chosenCrag = location.state.chosenCrag;

    let navigate = useNavigate();

    const [searching, setSearching] = useState(false);

    const [climbs, setClimbs] = useState([]);

    const [climbsToSearch, setClimbsToSearch] = useState('');

    const searchClimb = (input) => {
        if (input !== '') {
            setSearching(true);
            setClimbsToSearch(input);
        } else {
            setSearching(false)
            setClimbsToSearch('');
        }
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
        getCragInfo(chosenCrag)
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

    const sortByAscentsDecreasing = () => {
        const sortedClimbsByAscents = climbs.sort((ascent1 ,ascent2) => {
            return ((ascent2.numberoflogs) - (ascent1.numberoflogs));
        });
        setClimbs([...sortedClimbsByAscents])
    }

    const sortByAscentsIncreasing = () => {
        const sortedClimbsByAscents = climbs.sort((ascent1 ,ascent2) => {
            return ((ascent1.numberoflogs) - (ascent2.numberoflogs));
        });
        setClimbs([...sortedClimbsByAscents])
    }

    const sortByRatingDecreasing = () => {
        const sortedClimbsByRating = climbs.sort((ascent1 ,ascent2) => {
            return ((ascent2.averagerating) - (ascent1.averagerating));
        });
        setClimbs([...sortedClimbsByRating])
    }

    const sortByRatingIncreasing = () => {
        const sortedClimbsByRating = climbs.sort((ascent1 ,ascent2) => {
            return ((ascent1.averagerating) - (ascent2.averagerating));
        });
        setClimbs([...sortedClimbsByRating])
    }

    const sortByGradeIncreasing = () => {
        const sortedClimbsByGrade = climbs.sort((ascent1 ,ascent2) => {
            const splitAscent1 = ascent1.grade.split('');
            const splitAscent2 = ascent2.grade.split('');
            for (let i = 0; i <= 2; i++) {
                if (splitAscent1[i] > splitAscent2[i]) {
                    return 1
                } else if (splitAscent1[i] < splitAscent2[i]) {
                    return -1
                } else if (splitAscent1[i] === '+') {
                    return 1
                } else if (splitAscent2[i] === '+') {
                    return -1
                } else if (splitAscent1[i] === splitAscent2[i]) {
                    continue
                }  
                return 0;
            }
        });
        setClimbs([...sortedClimbsByGrade])
    }

    const sortByGradeDecreasing = () => {
        const sortedClimbsByGrade = climbs.sort((ascent1 ,ascent2) => {
            const splitAscent1 = ascent1.grade.split('');
            const splitAscent2 = ascent2.grade.split('');
            for (let i = 0; i <= 2; i++) {
                if (splitAscent1[i] > splitAscent2[i]) {
                    return -1
                } else if (splitAscent1[i] < splitAscent2[i]) {
                    return 1
                } else if (splitAscent1[i] === '+') {
                    return -1
                } else if (splitAscent2[i] === '+') {
                    return 1
                } else if (splitAscent1[i] === splitAscent2[i]) {
                    continue 
                }
                return 0;
            }
        });
        setClimbs([...sortedClimbsByGrade])
    }

    return (
        <div className='areasBox'>
            <h2 className='areasTitle'>{chosenCrag}</h2>
            <div className = 'areasSearchBox'>
                <div className="areasInputBox">
                    <span className="material-symbols-sharp areasSearchSymbol">search</span>
                    <input type='text' onChange={(e) => searchClimb(e.target.value)} className="areasInput"/>
                </div>
                <div className='areasResultsBox'>
                    {searching? <ClimbsSearchModal data={climbsToSearch} consideredCrag={chosenCrag}/> : null}
                </div>
            </div>
            <div className='sortButtonsBox'>
                <div className='sortButtonBox'>
                    <button onClick={sortByAscentsIncreasing}><span className="material-symbols-outlined">arrow_downward</span></button>
                    <div className='sortButtonText'>Ascents</div>
                    <button onClick={sortByAscentsDecreasing}><span className="material-symbols-outlined">arrow_upward</span></button>
                </div>
                <div className='sortButtonBox'>
                    <button onClick={sortByRatingIncreasing}><span className="material-symbols-outlined">arrow_downward</span></button>
                    <div className='sortButtonText'>Rating</div>
                    <button onClick={sortByRatingDecreasing}><span className="material-symbols-outlined">arrow_upward</span></button>
                </div>
                <div className='sortButtonBox'>
                    <button onClick={sortByGradeIncreasing}><span className="material-symbols-outlined">arrow_downward</span></button>
                    <div className='sortButtonText'>Grade</div>
                    <button onClick={sortByGradeDecreasing}><span className="material-symbols-outlined">arrow_upward</span></button>
                </div>
            </div>
            <div className='cragBox'>
                {climbs.map((climb, index) => {
                        return <div className='cragClimb' key={index} onClick={() => linkToClimb(climb)}>
                                    <div className='goodClimbTop'>
                                        <div>{climb.climb} - {climb.grade}</div>
                                        <div>{climb.averagerating} stars</div>
                                    </div>
                                    <div className='goodClimbBottom'>
                                        <div>{climb.crag} - {climb.area} - {climb.country}</div>
                                        <div>{climb.numberoflogs} ascents</div>
                                    </div>
                                </div>
                })}
            </div>
        </div>
    )
}

export default Crag;