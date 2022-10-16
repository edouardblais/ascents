import React, { useEffect, useState } from "react";
import { fetchAllConcernedUsers, fetchClimbInfo, fetchExactClimb, getAreaInfo, getCragInfo, fetchGoodClimbs, findClimbsByGradeAndTypeFilter, findClimbsByMinRatingFilter } from '../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from "../operations/Operations";
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import './Home.css'

const Home = () => {
    let navigate = useNavigate();

    const [input, setInput] = useState('');
    const [allData, setAllData] = useState([]);
    const [goodClimbs, setGoodClimbs] = useState([]);

    const [type, setType] = useState('');
    const [grade, setGrade] = useState('');
    const [minRating, setMinRating] = useState('');

    useEffect(() => {
        fetchGoodClimbs()
            .then((resolvedgoodclimbs) => {
                setGoodClimbs(resolvedgoodclimbs)
            })
    }, [])

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

    const goToGoodClimb = (climb) => {
        fetchExactClimb(climb.climb)
        .then((resolvedclimb) => {
            navigate('/SearchAreas/SearchCrags/SearchClimbs/Climb', {
                state: {
                    chosenClimb: resolvedclimb[0],
                }
            })
        })
    }

    const getSelectedType = (typevalue) => {
        setType(typevalue);
    };

    const getSelectedGrade = (grade) => {
        setGrade(grade)
    }

    const getSelectedMinimumRating = (rating) => {
        setMinRating(Number(rating))
    }

    const findClimbs = (grade, type, minRating) => {
        const gradeAndTypeArray = [];
        const minRatingArray = [];
        if (type !== '' && grade !== '' && minRating !== '') {
            findClimbsByGradeAndTypeFilter(grade, type)
                .then((resolvedData) => {
                    gradeAndTypeArray.push(...resolvedData)
                    console.log(gradeAndTypeArray)
                })
                .then(() => {
                    findClimbsByMinRatingFilter(minRating)
                        .then((resolvedData) => {
                            minRatingArray.push(...resolvedData)
                            console.log(minRatingArray)
                            const allDataArray = minRatingArray.filter(climb => gradeAndTypeArray.some(climbobject => {
                                if (climbobject.climb === climb.climb) {
                                    return true;
                                }
                                return false;
                            }))
                            console.log(allDataArray)
                            navigate('/SearchResults', {
                                state: {
                                    searchResults: allDataArray,
                                }
                            })
                        })
                })
        } else {
            alert('Please choose a type, a minimum grade, a maximum grade and a minimum rating!')
        }
    }

    return (
        <div className="homeBox">
            <Carousel/>
            <div className="findClimbs">
                <div>
                    <h2 className="homeBoxTitle">Know what you're looking for?</h2>
                    <h3 className="homeBoxSubTitle">Search for existing routes, crags, areas or users!</h3>
                </div>
                <div className="homeSearchBar">
                    <input type='text' onChange={(e) => searchAll(e.target.value)} className='homeInput'/>
                    <button className='homeSearchButton'><span className="material-symbols-sharp">search</span></button>
                </div>
                <div>
                    {allData.map((result, index) => {
                    return <div key={index} onClick={() => goToChosenData(result)}>{result.name? result.name : result.area? result.area : result.crag? result.crag : result.climb? result.climb : "Oops! Can't display result"}</div>
                    })}
                </div>
                <h2 className="homeBoxTitle">Explore Ascents database to find your dream climbs</h2>
                <div className="exploreClimbsBox">
                        <label htmlFor='type'>Type :</label>
                        <select name='type' id='type' className='filterInputs' value={type} onChange={(e) => getSelectedType(e.target.value)}>
                            <option value=''></option>
                            <option value='Bouldering'>Bouldering</option>
                            <option value='Sport Climbing'>Sport Climbing</option>
                            <option value='Trad Climbing'>Trad Climbing</option>
                        </select> 
                        <label htmlFor="grade">Grade</label>
                        <select name='grade' id='grade' className='filterInputs' value={grade} onChange={(e) => getSelectedGrade(e.target.value)}>
                            <option value=''></option>
                            <option value='5'>5</option>
                            <option value='6a'>6a</option>
                            <option value='6a+'>6a+</option>
                            <option value='6b'>6b</option>
                            <option value='6b+'>6b+</option>
                            <option value='6c'>6c</option>
                            <option value='6c+'>6c+</option>
                            <option value='7a'>7a</option>
                            <option value='7a+'>7a+</option>
                            <option value='7b'>7b</option>
                            <option value='7b+'>7b+</option>
                            <option value='7c'>7c</option>
                            <option value='7c+'>7c+</option>
                            <option value='8a'>8a</option>
                            <option value='8a+'>8a+</option>
                            <option value='8b'>8b</option>
                            <option value='8b+'>8b+</option>
                            <option value='8c'>8c</option>
                            <option value='8c+'>8c+</option>
                            <option value='9a'>9a</option>
                            <option value='9a+'>9a+</option>
                            <option value='9b'>9b</option>
                            <option value='9b+'>9b+</option>
                            <option value='9c'>9c+</option>
                            <option value='9c+'>9c+</option>
                        </select>
                        <label htmlFor="minrating">Minimum rating:</label>
                        <select name='minrating' id='minrating' className='filterInputs' value={minRating} onChange={(e) => getSelectedMinimumRating(e.target.value)}>
                            <option value='0'></option>
                            <option value='1'>1 star</option>
                            <option value='2'>2 stars</option>
                            <option value='3'>3 stars</option>
                        </select>
                    <button className="filterClimbsButton" onClick={() => findClimbs(grade, type, minRating)}>Find Climbs</button>
                </div>
            </div>
            <div className="awesomeClimbs">
                <h2>Featured Awesome Climbs</h2>
                <div className="goodClimbsBox">
                    {goodClimbs.map((result, index) => {
                        return  <div key={index} onClick={() => goToGoodClimb(result)} className="goodClimb">
                                    <div className="goodClimbTop">{result.climb} - {result.grade}</div>
                                    <div className="goodClimbBottom">{result.crag} - {result.area} - {result.country}</div>
                                </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home;