import React, { useEffect, useState } from "react";
import { processCountry } from '../../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from '../../operations/Operations';
import '../../areas/AreasSearchModal.css';

const CountrySearchModal = ({data}) => {

    const [possibleCountries, setPossibleCountries] = useState([]);
    
    let counter = 0;

    useEffect(() => {
        if (data !== '') {
            const trimCountry = trimSentence(data)
            const trimAndCapCountry = capitalizeFirstLetter(trimCountry);
            processCountry(trimAndCapCountry)
                .then((resolvedCountries) => {
                        setPossibleCountries(resolvedCountries);
                    })
        } else {
            setPossibleCountries([]);
        }
    }, [])


    const increment = () => {
        counter += 1;
    }

    return (
        <div  className="AreasSearchModalBox">
                <div>
                    {possibleCountries.map((result, index) => {
                        increment();
                        if (counter<=10) { 
                            return  <div key={index}>
                                        {result.country? <div className="displayDataBox">
                                                            <div className="displayDataSubBoxTop">
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

export default CountrySearchModal;