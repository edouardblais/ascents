import React, { useEffect, useState } from "react";
import { fetchAllConcernedUsers, fetchClimbCragAreaCountry } from '../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from "../operations/Operations";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    let navigate = useNavigate();

    const [input, setInput] = useState('');
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        if (input !== '') {
            const trimInput = trimSentence(input)
            const trimAndCapInput = capitalizeFirstLetter(trimInput);

            const combinedDataArray = [];

            fetchAllConcernedUsers(input)
                .then((usersdata) => {
                        for (let userdata of usersdata) {
                            combinedDataArray.push(userdata);
                        }
                        setAllData(combinedDataArray);
                })
                .catch ((err) => {
                    console.log(err)
                });
            
            fetchAllConcernedUsers(trimAndCapInput)
                .then((usersdata) => {
                    for (let userdata of usersdata) {
                        combinedDataArray.push(userdata);
                    }
                    setAllData(combinedDataArray);
                })
                .catch ((err) => {
                    console.log(err)
                });

            fetchClimbCragAreaCountry(trimAndCapInput)
                .then((climbsdata) => {
                    for (let climbdata of climbsdata) {
                        combinedDataArray.push(climbdata);
                    }
                    setAllData(combinedDataArray)
                })
                .catch((err) => {
                    console.log(err)
                });
        } else {
            setInput('');
        }
    }, [input])

    const searchAll = (input) => {
        setInput(input);
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
        <div>
            <h2>Search for routes, crags, areas or users!</h2>
            <input type='text' onChange={(e) => searchAll(e.target.value)}/>
            <div>
                {allData.map((result, index) => {
                   return <div key={index} onClick={() => goToChosenData(result)}>{result.name? result.name : result.climb? result.climb : result.crag? result.crag : result.area? result.area : "Oops! Can't display result"}</div>
                })}
            </div>
        </div>
    )
}

export default Home;