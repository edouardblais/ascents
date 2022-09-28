import React, { useEffect, useState } from "react";
import { fetchClimbInfo, fetchAllConcernedUsers } from '../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from "../operations/Operations";
import { useNavigate, Link } from 'react-router-dom';

const TopNav = () => {
    let navigate = useNavigate();

    const [input, setInput] = useState('');
    const [allData, setAllData] = useState([]);
    
    let counter = 0;

    useEffect(() => {
        if (input !== '') {
            const trimInput = trimSentence(input)
            const trimAndCapInput = capitalizeFirstLetter(trimInput);

            const combinedDataArray = [];

            Promise.all([fetchAllConcernedUsers(input), fetchAllConcernedUsers(trimAndCapInput), fetchClimbInfo(trimAndCapInput)])
                .then((alldata) => {
                    for (let data of alldata) {
                        combinedDataArray.push(...data);
                    }
                    setAllData(combinedDataArray)
                })
                .catch ((err) => {
                    console.log(err)
                })
        } else {
            setAllData([]);
        }
    }, [input])

    const searchAll = (input) => {
        setInput(input);
        counter = 0;
    }

    const goToChosenData = (result) => {
        if (result.name) {
            navigate('/visitUser', {
                state: {
                    otherUserInfo: result,
                }
            })
        } else if (result.area) {
            navigate('/SearchAreas/SearchCrags', {
                state: {
                    chosenArea: result,
                }
            })
        } else if (result.crag) {
            navigate('/SearchAreas/SearchCrags/SearchClimbs', {
                state: {
                    chosenCrag: result,
                }
            })
        } else if (result.climb) {
            navigate('/SearchAreas/SearchCrags/SearchClimbs/Climb', {
                state: {
                    chosenClimb: result,
                }
            })
        }
    }

    const increment = () => {
        counter += 1;
    }

    return (
        <nav>
            <ul>
                <Link to=''>
                    <li>Home</li>
                </Link>
                <Link to='RecentAscents'>
                    <li>Recent Ascents</li>
                </Link>
                <Link to='SearchAreas'>
                    <li>Areas</li>
                </Link>
                <Link to='Profile'>
                    <li>Profile</li>
                </Link>
                <Link to='AddAscent'>
                    <li>Add Ascent</li>
                </Link>
                <div>
                    <input type='text' onChange={(e) => searchAll(e.target.value)}/>
                    <div>
                        {allData.map((result, index) => { 
                            increment();
                            if (counter<=10) { 
                                return  <div key={index} onClick={() => goToChosenData(result)}>{result.name? result.name : result.area? result.area : result.crag? result.crag : result.climb? result.climb : "Oops! Can't display result"}</div>
                            } 
                        })}
                    </div>
                </div>
            </ul>
        </nav>
    )
}

export default TopNav;