import React, {useState} from 'react';
import { useLocation } from "react-router-dom";
import AddAscentModal from '../../../../addascent/AddAscentModal';
import { auth, addClimbToTodoList } from '../../../../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Climb = () => {
    const location = useLocation();
    const chosenClimb = location.state.chosenClimb;

    const [user, loading, error] = useAuthState(auth);
    const [displayModal, setDisplayModal] = useState(null)

    const showAddAscentModal = (chosenClimb) => {
        if (user) {
            setDisplayModal(chosenClimb)
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
            <p>{chosenClimb.crag? chosenClimb.crag : 'Crag Unknown' }, {chosenClimb.area? chosenClimb.area : 'Area Unknown' }, {chosenClimb.country? chosenClimb.country : 'Country Unknown' }</p>
            <p>{chosenClimb.grade? chosenClimb.grade : 'Grade Unknown' }, {chosenClimb.type? chosenClimb.type : 'Type Unknown'}</p>
            <p>Number of ascents: {chosenClimb.numberoflogs? chosenClimb.numberoflogs : 0}</p>
            <p>Average rating: {chosenClimb.averagerating? chosenClimb.averagerating : 'No rating recorded'}</p>
            <button onClick={() => showAddAscentModal(chosenClimb)}>+Tick!</button>
            <button onClick={addToToDo}>+To-do!</button>
            <div>
                {chosenClimb.logs?.map((ascent, index) => {
                    return <div key={index}>
                            <p>{ascent.name}</p>
                            <p>{ascent.date}</p>
                            <p>{ascent.rp}</p> 
                            <p>{ascent.grade}, {ascent.feel}</p>
                            <p>{ascent.rating} stars</p>
                            <p>{ascent.recommendation? 'Recommended':''}</p>
                            <p>{ascent.comment}</p>
                        </div>
                    })}
            </div>
            {displayModal===chosenClimb? <AddAscentModal climb={chosenClimb} useremail={user.email}/> : null}
        </div>
    )
}

export default Climb;