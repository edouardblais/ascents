import React, { useEffect, useState } from 'react';
import { addNewClimb, fetchCountry, fetchArea, fetchCrag, fetchClimb } from '../../firebase/Firebase';
import { capitalizeFirstLetter, trimSentence } from '../../operations/Operations';

const CreateNew = () => {
    const [country, setCountry] = useState('');
    const [area, setArea] = useState('');
    const [crag, setCrag] = useState('');
    const [climb, setClimb] = useState('');
    const [type, setType] = useState('');
    const [grade, setGrade] = useState('');

    const [countriesDisplayed, setCountriesDisplayed] = useState([]);
    const [areasDisplayed, setAreasDisplayed] = useState([]);
    const [cragsDisplayed, setCragsDisplayed] = useState([]);
    const [climbsDisplayed, setClimbsDisplayed] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');

    const [errorStatus, setErrorStatus] = useState(true);

    const defineCountry = (countryvalue) => {
        const trimCountry = trimSentence(countryvalue)
        const trimAndCapCountry = capitalizeFirstLetter(trimCountry);
        if (trimAndCapCountry.length !== 0) {
            setCountry(trimAndCapCountry);
        }
    };

    const defineArea = (areavalue) => {
        const trimArea = trimSentence(areavalue)
        const trimAndCapArea = capitalizeFirstLetter(trimArea);
        if (trimAndCapArea.length !== 0) {
            setArea(trimAndCapArea);
        }
    };

    const defineCrag = (cragvalue) => {
        const trimCrag = trimSentence(cragvalue)
        const trimAndCapCrag = capitalizeFirstLetter(trimCrag);
        if (trimAndCapCrag.length !== 0) {
            setCrag(trimAndCapCrag);
        }
    };

    const defineClimb = (climbvalue) => {
        const trimClimb = trimSentence(climbvalue)
        const trimAndCapClimb = capitalizeFirstLetter(trimClimb);
        if (trimAndCapClimb.length !== 0) {
            setClimb(trimAndCapClimb);
        } else {
            setClimb('');
        }
    };

    const getSelectedGrade = (gradevalue) => {
        setGrade(gradevalue);
    };

    const getSelectedType = (typevalue) => {
        setType(typevalue);
    };

    useEffect(() => {
        const possibleCountries = fetchCountry(country)
        possibleCountries.then((resolvedCountries) => {
            setCountriesDisplayed(resolvedCountries);
        })
    }, [country]);

    useEffect(() => {
        const possibleAreas = fetchArea(area)
        possibleAreas.then((resolvedAreas) => {
            setAreasDisplayed(resolvedAreas);
        })
    }, [area]);

    useEffect(() => {
        const possibleCrags = fetchCrag(crag)
        possibleCrags.then((resolvedCrags) => {
            setCragsDisplayed(resolvedCrags);
        })
    }, [crag]);

    useEffect(() => {
        const possibleClimbs = fetchClimb(climb)
        possibleClimbs.then((resolvedClimbs) => {
            setClimbsDisplayed(resolvedClimbs);
        })
    }, [climb]);

    const submitForm = (country, area, crag, climb, grade, type) => {
        if (country === '' || area === '' || crag === '' || climb === '' || grade === '' || type === '') {
            setErrorStatus(true);
            setErrorMessage('Please make sure no field is left empty');
        } else {
            setErrorStatus(false);
            setErrorMessage('');
        }
    }
    
    useEffect(() => {
        if (errorStatus === false) {
            addNewClimb(country, area, crag, climb, grade, type);
            setCountry('');
            setArea('');
            setCrag('');
            setClimb('');
            setGrade('');
            setType('');
        }
    }, [errorStatus]);

    return (
        <div>
            <h1>Add New Climb</h1>
            <form>
                <label htmlFor='country'>Country</label>
                <input type='text' id='country' name='country' value={country} onChange={(e) => defineCountry(e.target.value)}/>
                <div>
                    {countriesDisplayed.map((country, index) => {
                        return <div key={index}>{country}</div>
                    })}
                </div>

                <label htmlFor='area'>Area</label>
                <input type='text' id='area' name='area' value={area} onChange={(e) => defineArea(e.target.value)}/>
                <div>
                    {areasDisplayed.map((area, index) => {
                        return <div key={index}>{area}</div>
                    })}
                </div>

                <label htmlFor='crag'>Crag</label>
                <input type='text' id='crag' name='crag' value={crag} onChange={(e) => defineCrag(e.target.value)}/>
                <div>
                    {cragsDisplayed.map((crag, index) => {
                        return <div key={index}>{crag}</div>
                    })}
                </div>

                <label htmlFor='climb'>Climb</label>
                <input type='text' id='climb' name='climb' value={climb} onChange={(e) => defineClimb(e.target.value)}/>
                <div>
                    {climbsDisplayed.map((climb, index) => {
                        return <div key={index}>{climb}</div>
                    })}
                </div>

                <select name='grade' id='grade' value={grade} onChange={(e) => getSelectedGrade(e.target.value)}>
                    <option value=''></option>
                    <option value='5'>5</option>
                    <option value='6a'>6a</option>
                    <option value='6a+'>6a+</option>
                    <option value='6b'>6b</option>
                    <option value='6b+'>6b+</option>
                    <option value='6c'>6c</option>
                    <option value='6c+'>6c+</option>
                    <option value='7a'>7a</option>
                    <option value='7a+'>7a+</option>
                    <option value='7b'>7b</option>
                    <option value='7b+'>7b+</option>
                    <option value='7c'>7c</option>
                    <option value='7c+'>7c+</option>
                    <option value='8a'>8a</option>
                    <option value='8a+'>8a+</option>
                    <option value='8b'>8b</option>
                    <option value='8b+'>8b+</option>
                    <option value='8c'>8c</option>
                    <option value='8c+'>8c+</option>
                    <option value='9a'>9a</option>
                    <option value='9a+'>9a+</option>
                    <option value='9b'>9b</option>
                    <option value='9b+'>9b+</option>
                    <option value='9c'>9c+</option>
                    <option value='9c+'>9c+</option>
                </select>

                <select name='type' id='type' value={type} onChange={(e) => getSelectedType(e.target.value)}>
                    <option value=''></option>
                    <option value='Bouldering'>Bouldering</option>
                    <option value='Sport Climbing'>Sport Climbing</option>
                    <option value='Trad Climbing'>Trad Climbing</option>
                </select>

                <button type='button' onClick={() => submitForm(country, area, crag, climb, grade, type)}>Add New Climb</button>

                <div>{errorMessage}</div>
            </form>
        </div>
    )
}

export default CreateNew;