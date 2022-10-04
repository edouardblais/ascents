import React, { useState } from 'react';
import { useLocation } from "react-router-dom";


const Following = () => {
    const location = useLocation();
    const userInfo = location.state;

    const [seeFollowers, setSeeFollowers] = useState(false);

    const switchDisplay = () => {
        seeFollowers? setSeeFollowers(false) : setSeeFollowers(true)
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
                    userInfo.followers.map((name, index) => {
                            return <div key={index}>{name}</div>
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
                userInfo.following.map((name, index) => {
                        return <div key={index}>{name}</div>
                })
                :
                <div>You are not following anybody</div>
                }
            </div>
        </div>
    )
}

export default Following;