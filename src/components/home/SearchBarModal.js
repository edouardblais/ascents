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
                                                            <div className="displayDataSubBoxTop">
                                                                <p>{result.name}</p>
                                                                <p>{result.logbook.length}</p>
                                                            </div>
                                                            <div className="displayDataSubBoxBottom">
                                                                <p>User - {result.otherinfo.country || null}</p>
                                                                <p>ascents</p>
                                                            </div>
                                                        </div>
                                        : result.area? <div className="displayDataBox">
                                                            <div className="displayDataSubBoxTop">
                                                                <p>{result.area}</p>
                                                            </div>
                                                            <div className="displayDataSubBoxBottom">
                                                                <p>Area - {result.data.country || null}</p>
                                                            </div>
                                                        </div> 
                                        : result.crag?  <div className="displayDataBox">
                                                            <div className="displayDataSubBoxTop">
                                                                <p>{result.crag}</p>
                                                            </div>
                                                            <div className="displayDataSubBoxBottom">
                                                                <p>Crag - {result.data.area} - {result.data.country || null}</p>
                                                            </div>
                                                        </div> 
                                        : result.climb? <div className="displayDataBox">
                                                            <div className="displayDataSubBoxTop">
                                                                <p>{result.climb}</p>
                                                                <p>{result.data.numberoflogs}</p>
                                                            </div>
                                                            <div className="displayDataSubBoxBottom">
                                                                <p>Climb - {result.data.crag} - {result.data.area} - {result.data.country || null}</p>
                                                                <p>ascents</p>
                                                            </div>
                                                        </div>  
                                        : "Oops! No results found"}</div>
                        } 
                    })}
                </div>
        </div>
    )
}

export default SearchBarModal;