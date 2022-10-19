import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserInfoByEmail, removeFromFollowers, removeFromFollowing}  from '../../firebase/Firebase';
import '../Profile.css';


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
                <div>
                    <p onClick={switchDisplay}>Following</p>
                    <p>Followers</p>
                </div>
                <h3>Followers</h3>
                <div>
                    {userInfo.followers.length > 0 ? 
                    userInfo.followers.map((follower, index) => {
                            return  <div key={index}>
                                        <p onClick={() => seeProfile(follower)}>{follower.name}</p>
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
            <div>
                <p>Following</p>
                <p onClick={switchDisplay}>Followers</p>
            </div>
            <h3>Following</h3>
            <div>
                {userInfo.following.length > 0 ? 
                userInfo.following.map((followed, index) => {
                        return  <div key={index}>
                                    <p onClick={() => seeProfile(followed)}>{followed.name}</p>
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