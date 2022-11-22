import React, { useEffect, useState } from "react";
import { processCrag } from '../../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from "../../operations/Operations";
import { useNavigate } from 'react-router-dom';
import '../AreasSearchModal.css'

const CragsSearchModal = ({data, consideredArea}) => {
    let navigate = useNavigate();

    const [possibleCrags, setPossibleCrags] = useState([]);
    
    let counter = 0;

    useEffect(() => {
        if (data !== '') {
            const trimCrags = trimSentence(data)
            const trimAndCapCrags = capitalizeFirstLetter(trimCrags);
            processCrag(trimAndCapCrags)
                .then((resolvedCrags) => {
                    if (consideredArea === null) {
                        setPossibleCrags(resolvedCrags);
                    } else {
                        const filteredCrags = resolvedCrags.filter((crag) => (crag.area === consideredArea))
                        setPossibleCrags(filteredCrags);
                    }
                });
        } else {
            setPossibleCrags([]);
        }
    }, [data, consideredArea])

    const goToChosenCrag = (result) => {
                    navigate('/SearchAreas/SearchCrags/SearchClimbs', {
                        state: {
                            chosenCrag: result.crag,
                        }
                    })
    }

    const increment = () => {
        counter += 1;
    }

    return (
        <div  className="AreasSearchModalBox">
                <div>
                    {possibleCrags.map((result, index) => {
                        increment();
                        if (counter<=10) { 
                            return  <div key={index} onClick={() => goToChosenCrag(result)}>
                                        {result.crag? <div className="displayDataBox">
                                                            <div className="displayDataSubBoxTop">
                                                                <p>{result.crag}</p>
                                                            </div>
                                                            <div className="displayDataSubBoxBottom">
                                                                <p>{result.area} - {result.country}</p>
                                                            </div>
                                                        </div> 
                                        : "Oops! No results found"}</div>
                        } 
                    })}
                </div>
        </div>
    )
}

export default CragsSearchModal;