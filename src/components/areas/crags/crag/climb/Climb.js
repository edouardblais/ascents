import React, {useState} from 'react';
import { useLocation } from "react-router-dom";
import AddAscentModal from '../../../../addascent/AddAscentModal';
import { auth, addClimbToTodoList } from '../../../../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Climb = () => {
    const location = useLocation();
    const chosenClimb = location.state.chosenClimb;
    console.log(chosenClimb)

    const [user, loading, error] = useAuthState(auth);
    const [displayModal, setDisplayModal] = useState(false)

    const showAddAscentModal = () => {
        if (user) {
            setDisplayModal(true)
        } else {
            alert('Please sign in or register to tick a climb!')
        }
    };

    const addToToDo = () => {
        if (user) {
            addClimbToTodoList(chosenClimb, user.email)
        } else {
            alert('Please sign in or register to add a climb to your to-do list!')
        }
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
    
    return (
        <div>
            <h2>{chosenClimb.climb}</h2>
            <p>{chosenClimb.data.crag}, {chosenClimb.data.area}, {chosenClimb.data.country}</p>
            <p>{chosenClimb.data.grade}, {chosenClimb.data.type}</p>
            <button onClick={showAddAscentModal}>+Tick!</button>
            <button onClick={addToToDo}>+To-do!</button>
            {displayModal? <AddAscentModal climb={chosenClimb} useremail={user.email}/> : null}
        </div>
    )
}

export default Climb;