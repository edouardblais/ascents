import React, { useEffect, useState } from "react";
import { fetchAllClimbs, fetchAllUsers } from '../firebase/Firebase';

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
        const resultsOfInterestsArray = [];
        for (let data of allData) {
            if (data.name.startsWith(input)) {
                resultsOfInterestsArray.push(data.name)
            } else if (data.climb.startsWith(input)) {
                resultsOfInterestsArray.push(data.climb)
            } else if (data.area.startsWith(input)) {
                resultsOfInterestsArray.push(data.area)
            } else if (data.crags.startsWith(input)) {
                resultsOfInterestsArray.push(data.crags)
            }
        }
        setSearchResult(resultsOfInterestsArray);
    }

    return (
        <div>
            <h2>Search for routes, crags, areas or users!</h2>
            <input type='text' onChange={(e) => searchAll(e.target.value)}/>
            <div>
                {searchResult.map((result) => {
                   return <div>{result}</div>
                })}
            </div>
        </div>
    )
}

export default Home;