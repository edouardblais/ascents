import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { capitalizeFirstLetter, trimSentence } from '../operations/Operations';
import { fetchClimbCragAreaCountry } from '../firebase/Firebase';

const AddAscent = () => {
    const [userInput, setUserInput] = useState('');

    const [possibleClimbs, setPossibleClimbs] = useState([]);

    const defineInput = (input) => {
        setUserInput(input);
    };

    useEffect(() => {
        const trimInput = trimSentence(userInput)
        const trimAndCapInput = capitalizeFirstLetter(trimInput);
        const possibleClimbs = fetchClimbCragAreaCountry(trimAndCapInput);
        possibleClimbs.then((resolvedClimbs) => {
            setPossibleClimbs(resolvedClimbs);
        });
    }, [userInput]);


    return (
        <div>
            <h1>Add Ascent</h1>

            <input type='text' id='climb' name='climb' value={userInput} onChange={(e) => defineInput(e.target.value)}/>
            <div>
                {possibleClimbs.map((possibilities, index) => {
                     return <div key={index}>
                                {possibilities.climb} {possibilities.crag} {possibilities.area} {possibilities.country} {possibilities.grade} {possibilities.type}
                            </div>
                })}
            </div>

            <p>Can't find the route you're looking for? Create a new climb <Link to='CreateNew'>here!</Link></p>
        </div>
    )
}

export default AddAscent;