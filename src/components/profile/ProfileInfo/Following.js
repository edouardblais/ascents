import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserInfoByEmail, removeFromFollowers, removeFromFollowing}  from '../../firebase/Firebase';
import '../Profile.css';
import './Following.css';


const Following = ({userInfo}) => {
    const navigate = useNavigate();

    const [seeFollowers, setSeeFollowers] = useState(false);

    const switchDisplay = () => {
        seeFollowers? setSeeFollowers(false) : setSeeFollowers(true)
    }

    const unfollow = (followed) => {
        getUserInfoByEmail(followed.email)
            .then((resolvedinfo) => {
                const newFollowingArray = userInfo.following.filter((otheruser) => (otheruser.name !== resolvedinfo[0].name));
                const newFollowersArray = resolvedinfo[0].followers.filter((user) => (user.name !== userInfo.name));
                removeFromFollowing(userInfo, resolvedinfo[0], newFollowingArray);
                removeFromFollowers(userInfo, resolvedinfo[0], newFollowersArray);
                alert(`You have unfollowed ${resolvedinfo[0].name}!`)
            })
    }

    const seeProfile = (otheruser) => {
        getUserInfoByEmail(otheruser.email)
            .then((resolvedUser) => {
                const userinfo = resolvedUser[0];
                navigate('/visitUser', {
                    state: {
                        otherUserInfo: userinfo,
                    }
                })
            })
    }

    if (seeFollowers) {
        return (
            <div className='profileContent'>
                <div className='followingNav'>
                    <p onClick={switchDisplay} className='followingNavChoiceActive'>Following</p>
                    <p className='followingNavChoiceInactive'>Followers</p>
                </div>
                <div className='followingBox'>
                    {userInfo.followers.length > 0 ? 
                    userInfo.followers.map((follower, index) => {
                            return  <div key={index} className='followingSubBox'>
                                        <div className='followingNameBox' onClick={() => seeProfile(follower)}>
                                            <div className='followingTop'>{follower.name}</div>
                                            <div className='followingBottom'>{follower.otherinfo.country}</div>
                                        </div>
                                        <div className='followingTop'>{follower.logbook.length} ascents</div>
                                    </div>
                    })
                    :
                    <div>Nobody here yet</div>
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='profileContent'>
            <div className='followingNav'>
                <p className='followingNavChoiceInactive'>Following</p>
                <p className='followingNavChoiceActive' onClick={switchDisplay}>Followers</p>
            </div>
            <div className='followingBox'>
                {userInfo.following.length > 0 ? 
                userInfo.following.map((followed, index) => {
                        return  <div key={index} className='followingSubBox'>
                                    <div className='followingNameBox' onClick={() => seeProfile(followed)}>
                                        <div className='followingTop'>{followed.name}</div>
                                        <div className='followingBottom'>{followed.otherinfo.country}</div>
                                    </div>
                                    <div className='followingTop'>{followed.logbook.length} ascents</div>
                                    <button onClick={() => unfollow(followed)}>Unfollow</button>
                                </div>
                })
                :
                <div>Nobody here yet</div>
                }
            </div>
        </div>
    )
}

export default Following;