import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { getUserInfoByEmail, removeFromFollowers, removeFromFollowing}  from '../../firebase/Firebase'


const Following = () => {
    const location = useLocation();
    const userInfo = location.state;
    const navigate = useNavigate();

    const [seeFollowers, setSeeFollowers] = useState(false);

    const [otherUserInfo, setOtherUserInfo] = useState([]);

    const switchDisplay = () => {
        seeFollowers? setSeeFollowers(false) : setSeeFollowers(true)
    }

    const unfollow = (followed) => {
        getUserInfoByEmail(followed.email)
            .then((resolvedinfo) => {
                setOtherUserInfo(resolvedinfo[0])
            })
            .then(() => {
                const newFollowingArray = userInfo.following.filter((otherusername) => (otherusername !== otherUserInfo.name));
                const newFollowersArray = otherUserInfo.followers.filter((otherusername) => (otherusername !== otherUserInfo.name));
                removeFromFollowing(userInfo, otherUserInfo, newFollowingArray);
                removeFromFollowers(userInfo, otherUserInfo, newFollowersArray);
                alert(`You have unfollowed ${otherUserInfo.name}!`)
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
            <div>
                <div>
                    <p>Followers</p>
                    <p onClick={switchDisplay}>Following</p>
                </div>
                <div>
                    {userInfo.followers.length > 0 ? 
                    userInfo.followers.map((follower, index) => {
                            return  <div key={index}>
                                        <p onClick={() => seeProfile(follower)}>{follower.name}</p>
                                    </div>
                    })
                    :
                    <div>You do not have any followers</div>
                    }
                </div>
            </div>
        )
    }

    return (
        <div>
            <div>
                    <p>Following</p>
                    <p onClick={switchDisplay}>Followers</p>
                </div>
            <div>
                {userInfo.following.length > 0 ? 
                userInfo.following.map((followed, index) => {
                        return  <div key={index}>
                                    <p onClick={() => seeProfile(followed)}>{followed.name}</p>
                                    <button onClick={() => unfollow(followed)}>Unfollow</button>
                                </div>
                })
                :
                <div>You are not following anybody</div>
                }
            </div>
        </div>
    )
}

export default Following;