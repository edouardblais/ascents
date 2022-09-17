import React from 'react';
import { useLocation } from "react-router-dom";


const Following = () => {
    const location = useLocation();
    const userInfo = location.state;

    return (
        <div>
            <h1>Following</h1>
            <div>
                {userInfo.following.names.length > 0 ? 
                userInfo.following.names.map((name, index) => {
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