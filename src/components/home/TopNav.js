import React, { useEffect, useState } from "react";
import { fetchAllClimbs, fetchAllUsers } from '../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from "../operations/Operations";
import { useNavigate, Link } from 'react-router-dom';

const TopNav = () => {
    let navigate = useNavigate();

    const [allData, setAllData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const [numberOfResults, setNumberOfResults] = useState(0);

    useEffect(() => {
        const totalDataArray = [];

        fetchAllUsers()
            .then((usersdata) => {
                for (let userdata of usersdata) {
                    totalDataArray.push(userdata);
                }
                setAllData(totalDataArray);
            })
            .catch ((err) => {
                console.log(err)
            });

        fetchAllClimbs()
            .then((climbsdata) => {
                for (let climbdata of climbsdata) {
                    totalDataArray.push(climbdata);
                }
                setAllData(totalDataArray)
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    const searchAll = (input) => {
        const trimInput = trimSentence(input)
        const trimAndCapInput = capitalizeFirstLetter(trimInput);

        const resultsOfInterestsArray = [];
        const avoidAreaDuplicatesArray = [];
        const avoidCragDuplicatesArray = [];

        for (let data of allData) {
            if (data.name && (data.name.startsWith(input) || data.name.startsWith(trimAndCapInput))) {
                resultsOfInterestsArray.push({name: data.name,
                                              data: data,
                                            });
            } else if (data.climb && (data.climb.startsWith(input) || data.climb.startsWith(trimAndCapInput))) {
                resultsOfInterestsArray.push({climb: data.climb,
                                              data: data,
                                            });
            } else if (data.area && (data.area.startsWith(input) || data.area.startsWith(trimAndCapInput)) && !avoidAreaDuplicatesArray.includes(data.area)) {
                avoidAreaDuplicatesArray.push(data.area);
                resultsOfInterestsArray.push({area: data.area,
                                              data: data,
                                            });
            } else if (data.crag && (data.crag.startsWith(input) || data.crag.startsWith(trimAndCapInput)) && !avoidCragDuplicatesArray.includes(data.crag)) {
                avoidCragDuplicatesArray.push(data.crag);
                resultsOfInterestsArray.push({crag: data.crag,
                                              data: data,
                                            });
            }
        }
        
        if (input !== '') {
            setSearchResult(resultsOfInterestsArray);
        } else if (input === '') {
            setSearchResult([]);
        }
    }

    const goToChosenData = (result) => {
        if (result.name) {
            navigate('/visitUser', {
                state: {
                    otherUserInfo: result.data,
                }
            })
        } else if (result.area) {
            navigate('/SearchAreas/SearchCrags', {
                state: {
                    chosenArea: result.data,
                }
            })
        } else if (result.crag) {
            navigate('/SearchAreas/SearchCrags/SearchClimbs', {
                state: {
                    chosenCrag: result.data,
                }
            })
        } else if (result.climb) {
            navigate('/SearchAreas/SearchCrags/SearchClimbs/Climb', {
                state: {
                    chosenClimb: result.data,
                }
            })
        }
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
                        {searchResult.map((result, index) => {
                            if (numberOfResults<=10) {
                                return  <div key={index} onClick={() => goToChosenData(result)}>{result.name? result.name : result.climb? result.climb : result.crag? result.crag : result.area? result.area : "Oops! Can't display result"}</div>
                            }
                            setNumberOfResults(numberOfResults+1);  
                        })}
                    </div>
                </div>
            </ul>
        </nav>
    )
}

export default TopNav;