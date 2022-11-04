import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { addNewClimb, processCountry, processCrag, processClimb } from '../../firebase/Firebase';
import { capitalizeFirstLetter, trimSentence } from '../../operations/Operations';
import './CreateNew.css';
import AreasSearchModal from '../../areas/AreasSearchModal';
import CragsSearchModal from '../../areas/crags/CragsSearchModal';

const CreateNew = () => {
    const [country, setCountry] = useState('');
    const [areas, setAreas] = useState('');
    const [crags, setCrags] = useState('');
    const [climb, setClimb] = useState('');
    const [type, setType] = useState('');
    const [grade, setGrade] = useState('');

    const [searchingAreas, setSearchingAreas] = useState(false);
    const [searchingCrags, setSearchingCrags] = useState(false);
;
    const [countriesDisplayed, setCountriesDisplayed] = useState([]);
    const [climbsDisplayed, setClimbsDisplayed] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');

    const [errorStatus, setErrorStatus] = useState(true);

    const defineCountry = (countryvalue) => {
        setCountry(countryvalue);
    };

    const defineArea = (input) => {
        if (input !== '') {
            setSearchingAreas(true);
            setAreas(input);
        } else {
            setSearchingAreas(false)
            setAreas('');
        }
    }

    const defineCrag = (input) => {
        if (input !== '') {
            setSearchingCrags(true);
            setCrags(input);
        } else {
            setSearchingCrags(false)
            setCrags('');
        }
    };

    const defineClimb = (climbvalue) => {
        setClimb(climbvalue);
    };

    const getSelectedGrade = (gradevalue) => {
        setGrade(gradevalue);
    };

    const getSelectedType = (typevalue) => {
        setType(typevalue);
    };

    useEffect(() => {
        const trimCountry = trimSentence(country)
        const trimAndCapCountry = capitalizeFirstLetter(trimCountry);
        const possibleCountries = processCountry(trimAndCapCountry);
        possibleCountries.then((resolvedCountries) => {
            setCountriesDisplayed(resolvedCountries);
        })
    }, [country]);

    useEffect(() => {
        const trimClimb = trimSentence(climb)
        const trimAndCapClimb = capitalizeFirstLetter(trimClimb);
        const possibleClimbs = processClimb(trimAndCapClimb);
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
            addNewClimb(country, areas, crags, climb, grade, type);
            setCountry('');
            setAreas('');
            setCrags('');
            setClimb('');
            setGrade('');
            setType('');
            setErrorStatus(true);
        }
    }, [errorStatus]);
    
    return (
        <div className='addAscentBox'>
            <h2  className='climbTitle'> Create a new climb!</h2>
            <div className='warningBox'>
                <h4 className='createNewSubTitle'><span className="material-symbols-outlined">warning</span>Please check first that the climb you are about to create does not already exists <Link to='../AddAscent' className='linkToComponent'>here!</Link></h4>
                <h4 className='createNewSubTitle'><span className="material-symbols-outlined">warning</span>Existing countries, areas, crags and climbs will be suggested as you create your new climb. Click to check them out!</h4>
            </div>
            <div className='createNewFormBox'>
                <form className='createNewForm'>
                    <div className='modalFormBox'>
                        <div className='modalFormSubBox'>
                            <label htmlFor='country' className='modalFormTitles'>Country</label>
                            <input type='text' id='country' name='country' value={country} onChange={(e) => defineCountry(e.target.value)} className='modalFormInput'/>
                            <div>
                                {countriesDisplayed?.map((country, index) => {
                                    return <div key={index} onClick={() => defineCountry(country.country)}>{country.country}</div>
                                })}
                            </div>
                        </div>
                        <div className = 'areasSearchBox'>
                            <div className='modalFormSubBox'>
                                <label htmlFor='area' className='modalFormTitles'>Area</label>
                                <input type='text' id='area' name='area' value={areas} onChange={(e) => defineArea(e.target.value)} className='modalFormInput'/>
                            </div>
                            <div className='areasResultsBox'>
                                {searchingAreas? <AreasSearchModal data={areas}/> : null}
                            </div>
                        </div>
                    </div>
                    <div className='modalFormBox'>
                        <div className = 'areasSearchBox'>
                            <div className='modalFormSubBox'>
                                <label htmlFor='crag' className='modalFormTitles'>Crag</label>
                                <input type='text' id='crag' name='crag' value={crags} onChange={(e) => defineCrag(e.target.value)} className='modalFormInput'/>
                            </div>
                            <div className='areasResultsBox'>
                                {searchingCrags? <CragsSearchModal data={crags} consideredArea={null}/> : null}
                            </div>
                        </div>
                        <div className='modalFormSubBox'>
                            <label htmlFor='climb' className='modalFormTitles'>Climb</label>
                            <input type='text' id='climb' name='climb' value={climb} onChange={(e) => defineClimb(e.target.value)} className='modalFormInput'/>
                            <div>
                                {climbsDisplayed?.map((climb, index) => {
                                    return <div key={index} onClick={() => defineClimb(climb.climb)}>{climb.climb}</div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='modalFormBox'>
                        <div className='modalFormSubBox'>
                            <label htmlFor='grade' className='modalFormTitles'>Grade</label>
                            <select name='grade' id='grade' value={grade} onChange={(e) => getSelectedGrade(e.target.value)} className='modalFormInput'>
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
                        </div>
                        <div className='modalFormSubBox'>
                            <label htmlFor='type' className='modalFormTitles'>Type of climbing</label>
                            <select name='type' id='type' value={type} onChange={(e) => getSelectedType(e.target.value)} className='modalFormInput'>
                                <option value=''></option>
                                <option value='Bouldering'>Bouldering</option>
                                <option value='Sport Climbing'>Sport Climbing</option>
                                <option value='Trad Climbing'>Trad Climbing</option>
                            </select>
                        </div>
                    </div>
                    <div className='modalFormBox'>
                        <button type='button' onClick={() => submitForm(country, areas, crags, climb, grade, type)}>Add New Climb</button>
                    </div>
                    <div className='modalFormBox'>
                        <div>{errorMessage}</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateNew;