import React, { useEffect, useState } from "react";
import { fetchExactClimb, fetchGoodClimbs, findClimbsByGradeAndTypeFilter, findClimbsByMinRatingFilter } from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import { shuffleArray } from '../operations/Operations';
import './Home.css'

const Home = () => {
    let navigate = useNavigate();

    let counter = 0;

    const [goodClimbs, setGoodClimbs] = useState([]);

    const [type, setType] = useState('');
    const [grade, setGrade] = useState('');
    const [minRating, setMinRating] = useState('');

    useEffect(() => {
        fetchGoodClimbs()
            .then((resolvedgoodclimbs) => {
                console.log(resolvedgoodclimbs)
                const shuffledGoodClimbs = shuffleArray(resolvedgoodclimbs);
                console.log(shuffledGoodClimbs);
                setGoodClimbs(shuffledGoodClimbs);
            })
    }, [])

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
                })
                .then(() => {
                    findClimbsByMinRatingFilter(minRating)
                        .then((resolvedData) => {
                            minRatingArray.push(...resolvedData)
                            const allDataArray = minRatingArray.filter(climb => gradeAndTypeArray.some(climbobject => {
                                if (climbobject.climb === climb.climb) {
                                    return true;
                                }
                                return false;
                            }))
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

    const increment = () => {
        counter += 1;
    }

    return (
        <div className="homeBox">
            <Carousel/>
            <div className="findClimbs">
                <h2 className="homeBoxTitle">Explore <b>Ascents</b> To Find Your Dream Climbs</h2>
                <div className="exploreClimbsBox">
                        <label htmlFor='type' className="homeBoxSubTitle">Type</label>
                        <select name='type' id='type' className='filterInputs' value={type} onChange={(e) => getSelectedType(e.target.value)}>
                            <option value=''></option>
                            <option value='Bouldering'>Bouldering</option>
                            <option value='Sport Climbing'>Sport Climbing</option>
                            <option value='Trad Climbing'>Trad Climbing</option>
                        </select> 
                        <label htmlFor="grade" className="homeBoxSubTitle">Grade</label>
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
                        <label htmlFor="minrating" className="homeBoxSubTitle">Minimum Rating</label>
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
                <h2 className="homeBoxTitle">Featured Awesome Climbs Based On <b>Ascents</b> Users</h2>
                <div className="goodClimbsBox">
                    {goodClimbs.map((result, index) => {
                        increment();
                        if (counter <= 8) { 
                            return  <div key={index} onClick={() => goToGoodClimb(result)} className="goodClimb">
                                        <div className="goodClimbTop">
                                            <div>{result.climb} - {result.grade}</div>
                                            <div>{result.averagerating} stars</div>
                                        </div>
                                        <div className="goodClimbBottom">
                                            <div>{result.crag} - {result.area} - {result.country}</div>
                                            <div>{result.numberoflogs} ascents</div>
                                        </div>
                                    </div>
                        } 
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home;