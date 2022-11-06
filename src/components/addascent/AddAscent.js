import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { capitalizeFirstLetter, trimSentence } from '../operations/Operations';
import { fetchClimbCragAreaCountry, auth, addClimbToTodoList, fetchExactClimb } from '../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import AddAscentModal from './AddAscentModal';
import './AddAscent.css';

const AddAscent = () => {

    const navigate = useNavigate();

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

    const goToChosenClimb = (climb) => {
        fetchExactClimb(climb)
                .then((resolvedclimb) => {
                    navigate('/SearchAreas/SearchCrags/SearchClimbs/Climb', {
                        state: {
                            chosenClimb: resolvedclimb[0],
                        }
                    })
                })
    }

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
            <div className='addAscentBox'>
                <h2 className='climbTitle'>Add ascents to your logbook!</h2>
                <div className = 'addAscentSearchBox'>
                    <h4 className='climbSubTitle'>Search for a climb by it's name, crag, area or country</h4> 
                    <div className="areasInputBox">
                        <span className="material-symbols-sharp areasSearchSymbol">search</span>
                        <input type='text' id='climb' name='climb' value={userInput} onChange={(e) => defineInput(e.target.value)} className="areasInput"/>
                    </div>
                    <h5 className='climbSubSubTitle'>Can't find the route you're looking for? Create a new climb <Link to='CreateNew' className='linkToComponent'>here!</Link></h5>
                </div>
                <div className='addAscentClimbsBox'>
                    {possibleClimbs?.map((possibility, index) => {
                            if (possibility.climb!=='') {
                                return <div key={index}  className='addAscentClimb'>
                                            <div className="addAscentClimbInfo" onClick={() => goToChosenClimb(possibility.climb)}>
                                                <div className="goodClimbTop">
                                                    <div>{possibility.climb} - {possibility.grade}</div>
                                                    <div>{possibility.averagerating} stars</div>
                                                </div>
                                                <div className="goodClimbBottom">
                                                    <div>{possibility.crag} - {possibility.area} - {possibility.country}</div>
                                                    <div>{possibility.numberoflogs} ascents</div>
                                                </div >
                                            </div>
                                            <div className='addAscentButtonBox'>
                                                <button onClick={() => showAddAscentModal(possibility)}>Tick it!</button>
                                                <button onClick={() => addClimbToTodoList(possibility, user.email)}>To-do!</button>
                                            </div>
                                            {modalToDisplay===possibility? <AddAscentModal climb={possibility} useremail={user.email}/> : null}
                                        </div>
                            };
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className='authentificationBox'>
            <h3 className='authentificationTitle'><b>Oops!</b></h3>
            <div className='authentificationLabel'>
                Please <Link className='linkToComponent' to='/SignIn' >sign in</Link> or <Link className='linkToComponent' to='/CreateUser'>register</Link> to add ascents!
            </div>
        </div>
    )
}

export default AddAscent;