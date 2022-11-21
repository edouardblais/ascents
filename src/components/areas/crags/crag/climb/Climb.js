import React, {useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import AddAscentModal from '../../../../addascent/AddAscentModal';
import { auth, addClimbToTodoList, getUserInfoByEmail } from '../../../../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Climb.css';

const Climb = () => {
    const navigate = useNavigate();
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

    const seeProfile = (email) => {
        const user = getUserInfoByEmail(email);
        user.then((resolvedUser) => {
            const userinfo = resolvedUser[0];
            navigate('/visitUser', {
                state: {
                    otherUserInfo: userinfo,
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
    
    return (
        <main className='climbBox'>
            <div className='climbInfoBox'>
                <div className='climbInfoSubBox mainInfoParticularities'>
                    <h2 className='climbTitle'>{chosenClimb.climb}</h2>
                    <h4 className='climbSubTitle'>{chosenClimb.crag? chosenClimb.crag : 'Crag Unknown' } - {chosenClimb.area? chosenClimb.area : 'Area Unknown' } - {chosenClimb.country? chosenClimb.country : 'Country Unknown' }</h4>
                </div>
                <div className='climbInfoSubBox secondaryInfoParticularities'>
                    <h4 className='climbSubTitle'>{chosenClimb.grade? chosenClimb.grade : 'Grade Unknown'}</h4>
                    <h5 className='climbSubSubTitle'>Grade</h5>
                </div>
                <div className='climbInfoSubBox secondaryInfoParticularities'>
                    <h4 className='climbSubTitle'>{chosenClimb.type? chosenClimb.type : 'Type Unknown'}</h4>
                    <h5 className='climbSubSubTitle'>Type</h5>
                </div>
                <div className='climbInfoSubBox secondaryInfoParticularities'>
                    <h4 className='climbSubTitle'>{chosenClimb.numberoflogs? chosenClimb.numberoflogs : 0}</h4>
                    <h5 className='climbSubSubTitle'>Ascents</h5>
                </div>
                <div className='climbInfoSubBox secondaryInfoParticularities'>
                    <h4 className='climbSubTitle'>{chosenClimb.averagerating? chosenClimb.averagerating: 'No rating recorded'}</h4> 
                    <h5 className='climbSubSubTitle'>Star Rating</h5>
                </div>  
                <div className='climbInfoSubBox secondaryInfoParticularities'>
                    <button onClick={() => showAddAscentModal(chosenClimb)}>Tick it!</button>
                </div>   
                <div className='climbInfoSubBox secondaryInfoParticularities'>
                    <button onClick={addToToDo}>To-do!</button>
                </div>    
            </div>
            <div className='loggedAscentsBox'>
                {chosenClimb.logs?.map((climb, index) => {
                    return  <div key={index} className='recentAscentBox'>
                                <div className='loggedClimbNameBox'>
                                    <div className='loggedClimbTopInfo' onClick={() => seeProfile(climb.email)}>{climb.name}</div>
                                </div>
                                <div className='loggedClimbCommentBox'>
                                    <div  className='loggedClimbBottomInfo'>{climb.comment}</div>
                                </div>
                                <div>
                                    <span className={climb.rp==='onsight'? 'onsight material-symbols-outlined' : climb.rp === 'flash'? 'flash material-symbols-outlined' : 'material-symbols-outlined redpoint'}>adjust</span>
                                </div>
                                <div className='loggedClimbSubBox'>
                                    <div className='loggedClimbTopInfo'>{climb.grade} <span className='loggedClimbBottomInfo'>{climb.feel}</span></div>
                                </div>
                                <div className='loggedClimbSubBox'>
                                    <div className='loggedClimbTopInfo'>{climb.rating} stars</div>
                                    <div className='loggedClimbBottomInfo'>{climb.recommendation? <span className="material-symbols-outlined redpoint">favorite</span>:''}</div>
                                </div>
                                <div className='loggedClimbSubBox'>
                                    <div className='loggedClimbTopInfo'>{climb.date}</div>
                                </div>
                            </div>
                    })}
            </div>
            {displayModal===chosenClimb? <AddAscentModal climb={chosenClimb} useremail={user.email}/> : null}
        </main>
    )
}

export default Climb;