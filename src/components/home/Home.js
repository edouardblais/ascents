import React, { useEffect, useState } from "react";
import { fetchAllClimbs, fetchAllUsers } from '../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from "../operations/Operations";

const Home = () => {
    const [allData, setAllData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

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
                resultsOfInterestsArray.push(data.name);
            } else if (data.climb && (data.climb.startsWith(input) || data.climb.startsWith(trimAndCapInput))) {
                resultsOfInterestsArray.push(data.climb);
            } else if (data.area && (data.area.startsWith(input) || data.area.startsWith(trimAndCapInput)) && !avoidAreaDuplicatesArray.includes(data.area)) {
                avoidAreaDuplicatesArray.push(data.area);
                resultsOfInterestsArray.push(data.area);
            } else if (data.crag && (data.crag.startsWith(input) || data.crag.startsWith(trimAndCapInput)) && !avoidCragDuplicatesArray.includes(data.crag)) {
                avoidCragDuplicatesArray.push(data.crag);
                resultsOfInterestsArray.push(data.crag);
            }
        }
        setSearchResult(resultsOfInterestsArray);
    }

    return (
        <div>
            <h2>Search for routes, crags, areas or users!</h2>
            <input type='text' onChange={(e) => searchAll(e.target.value)}/>
            <div>
                {searchResult.map((result, index) => {
                   return <div key={index}>{result}</div>
                })}
            </div>
        </div>
    )
}

export default Home;