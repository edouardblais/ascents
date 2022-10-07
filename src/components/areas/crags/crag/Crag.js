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
            for (let i = 1; i <= 3; i++) {
                if (splitAscent1[i] > splitAscent2[i]) {
                    return 1
                } else if (splitAscent1[i] < splitAscent2[i]) {
                    return -1
                } else {
                    return 0
                }
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
                    console.log('a')
                    return -1
                } else if (splitAscent1[i] < splitAscent2[i]) {
                    console.log('b')
                    return 1
                } else if (splitAscent1[i] === '+') {
                    console.log('c')
                    return 1
                } else if (splitAscent2[i] === '+') {
                    console.log('d')
                    return -1
                } else {
                    console.log('e')
                    return 0
                }
            }
        });
        setClimbs([...sortedClimbsByGrade])
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
                <p onClick={sortByAscentsIncreasing}>Ascents++</p>
                <p onClick={sortByAscentsDecreasing}>Ascents--</p>
                <p onClick={sortByRatingIncreasing}>Rating++</p>
                <p onClick={sortByRatingDecreasing}>Rating--</p>
                <p onClick={sortByGradeIncreasing}>Grade++</p>
                <p onClick={sortByGradeDecreasing}>Grade--</p>
            </div>
            <ul>
                {climbs.map((climb, index) => {
                    return <li key={index} onClick={() => linkToClimb(climb)}>{climb.climb}: {climb.numberoflogs} Ascents, {climb.averagerating} stars, {climb.grade}</li>
                })}
            </ul>
        </div>
    )
}

export default Crag;