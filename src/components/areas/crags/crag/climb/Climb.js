import React, {useState} from 'react';
import { useLocation } from "react-router-dom";
import AddAscentModal from '../../../../addascent/AddAscentModal';
import { auth, addClimbToTodoList } from '../../../../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Climb = () => {
    const location = useLocation();
    const chosenClimb = location.state.chosenClimb;

    const [user, loading, error] = useAuthState(auth);
    const [displayModal, setDisplayModal] = useState(false)

    const showAddAscentModal = () => {
        setDisplayModal(true)
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
                <h2>{chosenClimb.climb}</h2>
                <button onClick={() => showAddAscentModal()}>+Tick!</button>
                <button onClick={() => addClimbToTodoList(chosenClimb, user.email)}>+To-do!</button>
                {displayModal? <AddAscentModal climb={chosenClimb} useremail={user.email}/> : null}
            </div>
        )
    }
}

export default Climb;