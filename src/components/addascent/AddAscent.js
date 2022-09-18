import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { capitalizeFirstLetter, trimSentence } from '../operations/Operations';
import { fetchClimbCragAreaCountry, auth, addClimbToTodoList } from '../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import AddAscentModal from './AddAscentModal';

const AddAscent = () => {

    const [user, loading, error] = useAuthState(auth);

    const [modalToDisplay, setModalToDisplay] = useState('');

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

    const showAddAscentModal = (possibility) => {
        setModalToDisplay(possibility)
    };

    if (loading) {
        return (
          <div>
            <p>Initialising User...</p>
          </div>
        );
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }

    if (user) {
        return (
            <div>
                <h1>Add Ascent</h1>

                <input type='text' id='climb' name='climb' value={userInput} onChange={(e) => defineInput(e.target.value)}/>
                <div>
                    {possibleClimbs.map((possibility, index) => {
                        if (possibility.climb!=='') {
                            return <div key={index}>
                                        <div>{possibility.climb} {possibility.crag} {possibility.area} {possibility.country} {possibility.grade} {possibility.type}</div>
                                        <button onClick={() => showAddAscentModal(possibility)}>+Tick!</button>
                                        <button onClick={() => addClimbToTodoList(possibility, user.email)}>+To-do!</button>
                                        {modalToDisplay===possibility? <AddAscentModal climb={possibility} useremail={user.email} username={user.name}/> : null}
                                    </div>
                        };
                    })}
                </div>

                <p>Can't find the route you're looking for? Create a new climb <Link to='CreateNew'>here!</Link></p>
            </div>
        )
    }

    return (
        <div>
            Please <Link to='/SignIn'>sign in</Link> or <Link to='/CreateUser'>create a new user profile</Link> to add ascents!
        </div>
    )
}

export default AddAscent;