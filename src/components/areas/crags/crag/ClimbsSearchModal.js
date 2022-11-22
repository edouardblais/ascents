import React, { useEffect, useState } from "react";
import { processClimb } from '../../../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from "../../../operations/Operations";
import { useNavigate } from 'react-router-dom';
import '../../AreasSearchModal.css'

const ClimbsSearchModal = ({data, consideredCrag}) => {
    let navigate = useNavigate();

    const [possibleClimbs, setPossibleClimbs] = useState([]);
    
    let counter = 0;

    useEffect(() => {
        if (data !== '') {
            const trimClimbs = trimSentence(data)
            const trimAndCapClimbs = capitalizeFirstLetter(trimClimbs);
            processClimb(trimAndCapClimbs)
                .then((resolvedClimbs) => {
                    if (consideredCrag === null) {
                        setPossibleClimbs(resolvedClimbs);
                    } else {
                        const filteredClimbs = resolvedClimbs.filter((climb) => (climb.crag === consideredCrag))
                        setPossibleClimbs(filteredClimbs);
                    }
                });
        } else {
            setPossibleClimbs([]);
        }
    }, [data, consideredCrag])

    const goToChosenClimb = (result) => {
                    navigate('/SearchAreas/SearchCrags/SearchClimbs/Climb', {
                        state: {
                            chosenClimb: result,
                        }
                    })
    }

    const increment = () => {
        counter += 1;
    }

    return (
        <div  className="AreasSearchModalBox">
                <div>
                    {possibleClimbs.map((result, index) => {
                        increment();
                        if (counter<=10) { 
                            return  <div key={index} onClick={() => goToChosenClimb(result)}>
                                        {result.crag? <div className="displayDataBox">
                                                            <div className="displayDataSubBoxTop">
                                                                <p>{result.climb}</p>
                                                            </div>
                                                            <div className="displayDataSubBoxBottom">
                                                                <p>{result.crag} - {result.area} - {result.country}</p>
                                                            </div>
                                                        </div> 
                                        : "Oops! No results found"}</div>
                        } 
                    })}
                </div>
        </div>
    )
}

export default ClimbsSearchModal;