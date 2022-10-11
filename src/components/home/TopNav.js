import React, { useEffect, useState } from "react";
import { fetchClimbInfo, fetchAllConcernedUsers, getCragInfo, getAreaInfo, fetchExactClimb } from '../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from "../operations/Operations";
import { useNavigate, Link } from 'react-router-dom';
import './TopNav.css'

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
            getAreaInfo(result.area)
                .then((resolvedareas) => {
                    const areasList = [];
                    const areasDataList = [];
                    resolvedareas.map((eachData) => {
                        if (!areasList.includes(eachData.area)) {
                            areasList.push(eachData.area);
                            areasDataList.push(eachData);
                        }
                        })
                    navigate('/SearchAreas/SearchCrags', {
                        state: {
                            chosenArea: areasDataList[0],
                        }
                    })
                })
        } else if (result.crag) {
            getCragInfo(result.crag)
                .then((resolvedcrags) => {
                    const cragsList = [];
                    const cragsDataList = [];
                    resolvedcrags.map((eachData) => {
                        if (!cragsList.includes(eachData.crag)) {
                            cragsList.push(eachData.crag);
                            cragsDataList.push(eachData);
                        }
                        })
                    navigate('/SearchAreas/SearchCrags/SearchClimbs', {
                        state: {
                            chosenArea: cragsDataList[0],
                        }
                    })
                })
        } else if (result.climb) {
            fetchExactClimb(result.climb)
                .then((resolvedclimb) => {
                    navigate('/SearchAreas/SearchCrags/SearchClimbs/Climb', {
                        state: {
                            chosenClimb: resolvedclimb[0],
                        }
                    })
                })
        }
    }


    const increment = () => {
        counter += 1;
    }

    return (
        <nav className="topNavMainBox">
            <h1>Ascents</h1>
            <ul className="topNavLinks">
                <Link to=''>
                    <li>Home</li>
                </Link>
                <Link to='Profile'>
                    <li>Profile</li>
                </Link>
                <Link to='RecentAscents'>
                    <li>Recent Ascents</li>
                </Link>
                <Link to='SearchAreas'>
                    <li>Areas</li>
                </Link>
                <Link to='AddAscent'>
                    <li>Add Ascent</li>
                </Link>
            </ul>
            <div className="topNavSearchResultBox">
                <div className="topNavInputBox">
                    <span className="material-symbols-sharp">search</span>
                    <input type='text' onChange={(e) => searchAll(e.target.value)} placeholder='Search for climbs, crags, areas, users...' className="topNavInput"/>
                </div>
                <div>
                    {allData.map((result, index) => { 
                        increment();
                        if (counter<=10) { 
                            return  <div key={index} onClick={() => goToChosenData(result)}>{result.name? result.name : result.area? result.area : result.crag? result.crag : result.climb? result.climb : "Oops! Can't display result"}</div>
                        } 
                    })}
                </div>
            </div>
        </nav>
    )
}

export default TopNav;