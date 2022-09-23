import React from 'react';
import { Link, useLocation } from "react-router-dom";

const Crags = () => {
    const location = useLocation();
    const chosenArea = location.state.chosenArea;

    return (
        <div>
            <h2>{chosenArea.area}</h2>
            <Link to='SomeCrag'>Crag</Link>
        </div>
    )
}

export default Crags;