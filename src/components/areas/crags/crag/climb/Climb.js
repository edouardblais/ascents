import React from 'react';
import { useLocation } from "react-router-dom";

const Climb = () => {
    const location = useLocation();
    const chosenClimb = location.state.chosenClimb;

    return (
        <div>
            <h2>{chosenClimb.climb}</h2>
        </div>
    )
}

export default Climb;