import React, { useEffect, useState } from "react";
import { fetchClimbInfo, fetchAllConcernedUsers, getCragInfo, getAreaInfo, fetchExactClimb } from '../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from "../operations/Operations";
import { useNavigate } from 'react-router-dom';
import './SearchBarModal.css';

const SearchBarModal = ({data}) => {
    let navigate = useNavigate();

    const [allData, setAllData] = useState([]);
    
    let counter = 0;

    useEffect(() => {
        if (data !== '') {
            const trimInput = trimSentence(data)
            const trimAndCapInput = capitalizeFirstLetter(trimInput);

            const combinedDataArray = [];

            Promise.all([fetchAllConcernedUsers(data), fetchAllConcernedUsers(trimAndCapInput), fetchClimbInfo(trimAndCapInput)])
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
    }, [])

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
        <div  className="searchBarModal">
                <div>
                    {allData.map((result, index) => {
                        console.log(result)
                        increment();
                        if (counter<=10) { 
                            return  <div key={index} onClick={() => goToChosenData(result)}>
                                        {result.name?   <div className="displayDataBox">
                                                            <div className="displayDataSubBox">
                                                                <p>{result.name}</p>
                                                                <p>{result.logbook.length}</p>
                                                            </div>
                                                            <div className="displayDataSubBox">
                                                                <p>user - {result.otherinfo.country || null}</p>
                                                                <p>ascents</p>
                                                            </div>
                                                        </div>
                                        : result.area? result.area : result.crag? result.crag : result.climb? result.climb : "Oops! Can't display result"}</div>
                        } 
                    })}
                </div>
        </div>
    )
}

export default SearchBarModal;