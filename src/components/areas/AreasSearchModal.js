import React, { useEffect, useState } from "react";
import { getAreaInfo, processArea } from '../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from "../operations/Operations";
import { useNavigate } from 'react-router-dom';
import './AreasSearchModal.css';

const AreasSearchModal = ({data}) => {
    let navigate = useNavigate();

    const [possibleAreas, setPossibleAreas] = useState([]);
    
    let counter = 0;

    useEffect(() => {
        if (data !== '') {
            const trimAreas = trimSentence(data)
            const trimAndCapAreas = capitalizeFirstLetter(trimAreas);
            processArea(trimAndCapAreas)
                .then((resolvedAreas) => {
                    setPossibleAreas(resolvedAreas);
                });
        } else {
            setPossibleAreas([]);
        }
    }, [])

    const goToChosenArea = (result) => {
                    navigate('/SearchAreas/SearchCrags', {
                        state: {
                            chosenArea: result.area,
                        }
                })
    }

    const increment = () => {
        counter += 1;
    }

    return (
        <div  className="AreasSearchModalBox">
                <div>
                    {possibleAreas.map((result, index) => {
                        increment();
                        if (counter<=10) { 
                            return  <div key={index} onClick={() => goToChosenArea(result)}>
                                        {result.area? <div className="displayDataBox">
                                                            <div className="displayDataSubBoxTop">
                                                                <p>{result.area}</p>
                                                            </div>
                                                            <div className="displayDataSubBoxBottom">
                                                                <p>{result.country}</p>
                                                            </div>
                                                        </div> 
                                        : "Oops! No results found"}</div>
                        } 
                    })}
                </div>
        </div>
    )
}

export default AreasSearchModal;