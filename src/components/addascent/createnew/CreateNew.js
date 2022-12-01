import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { addNewClimb } from '../../firebase/Firebase';
import { trimSentence, capitalizeFirstLetter } from '../../operations/Operations';
import './CreateNew.css';
import AreasSearchModal from '../../areas/AreasSearchModal';
import CragsSearchModal from '../../areas/crags/CragsSearchModal';
import ClimbsSearchModal from '../../areas/crags/crag/ClimbsSearchModal';
import CountrySearchModal from './CountrySearchModal';

const CreateNew = () => {
    const [countries, setCountries] = useState('');
    const [areas, setAreas] = useState('');
    const [crags, setCrags] = useState('');
    const [climbs, setClimbs] = useState('');
    const [type, setType] = useState('');
    const [grade, setGrade] = useState('');

    const [searchingCountries, setSearchingCountries] = useState(false);
    const [searchingAreas, setSearchingAreas] = useState(false);
    const [searchingCrags, setSearchingCrags] = useState(false);
    const [searchingClimbs, setSearchingClimbs] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const [errorStatus, setErrorStatus] = useState(true);

    const defineCountry = (input) => {
        if (input !== '') {
            setSearchingCountries(true);
            setSearchingAreas(false);
            setSearchingCrags(false);
            setSearchingClimbs(false);
            setCountries(input);
        } else {
            setSearchingCountries(false)
            setCountries('');
        }
    };

    const defineArea = (input) => {
        if (input !== '') {
            setSearchingAreas(true);
            setSearchingClimbs(false);
            setSearchingCountries(false);
            setSearchingCrags(false);
            setAreas(input);
        } else {
            setSearchingAreas(false)
            setAreas('');
        }
    }

    const defineCrag = (input) => {
        if (input !== '') {
            setSearchingCrags(true);
            setSearchingAreas(false);
            setSearchingClimbs(false);
            setSearchingCountries(false);
            setCrags(input);
        } else {
            setSearchingCrags(false)
            setCrags('');
        }
    };

    const defineClimb = (input) => {
        if (input !== '') {
            setSearchingClimbs(true);
            setSearchingCrags(false);
            setSearchingAreas(false);
            setSearchingCountries(false);
            setClimbs(input);
        } else {
            setSearchingClimbs(false)
            setClimbs('');
        }
    };

    const getSelectedGrade = (gradevalue) => {
        setSearchingClimbs(false);
        setSearchingCrags(false);
        setSearchingAreas(false);
        setSearchingCountries(false);
        setGrade(gradevalue);
    };

    const getSelectedType = (typevalue) => {
        setSearchingClimbs(false);
        setSearchingCrags(false);
        setSearchingAreas(false);
        setSearchingCountries(false);
        setType(typevalue);
    };

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
            const trimCountry = trimSentence(countries);
            const trimAndCapCountry = capitalizeFirstLetter(trimCountry);

            const trimArea = trimSentence(areas);
            const trimAndCapArea = capitalizeFirstLetter(trimArea);

            const trimCrag = trimSentence(crags)
            const trimAndCapCrag = capitalizeFirstLetter(trimCrag);

            const trimClimb = trimSentence(climbs);
            const trimAndCapClimb = capitalizeFirstLetter(trimClimb);

            addNewClimb(trimAndCapCountry, trimAndCapArea, trimAndCapCrag, trimAndCapClimb, grade, type);
            setCountries('');
            setAreas('');
            setCrags('');
            setClimbs('');
            setGrade('');
            setType('');
            setErrorStatus(true);
        }
    }, [errorStatus]);
    
    return (
        <main className='addAscentBox'>
            <h2  className='climbTitle'> Create a new climb!</h2>
            <div className='warningBox'>
                <h4 className='createNewSubTitle'><span className="material-symbols-outlined">warning</span>Please check first that the climb you are about to create does not already exists <Link to='../AddAscent' className='linkToComponent'>here!</Link></h4>
                <h4 className='createNewSubTitle'><span className="material-symbols-outlined">warning</span>Existing countries, areas, crags and climbs will be suggested as you create your new climb. Please reuse them if appropriate!</h4>
            </div>
            <div className='createNewFormBox'>
                <form className='createNewForm'>
                    <div className='modalFormBox'>
                        <div className = 'areasSearchBox'>
                            <div className='modalFormSubBox'>
                                <label htmlFor='country' className='modalFormTitles'>Country</label>
                                <input type='text' id='country' name='country' value={countries} onChange={(e) => defineCountry(e.target.value)} className='modalFormInput' required/>
                            </div>
                            <div className='areasResultsBox'>
                                {searchingCountries? <CountrySearchModal data={countries}/> : null}
                            </div>
                        </div>
                        <div className = 'areasSearchBox'>
                            <div className='modalFormSubBox'>
                                <label htmlFor='area' className='modalFormTitles'>Area</label>
                                <input type='text' id='area' name='area' value={areas} onChange={(e) => defineArea(e.target.value)} className='modalFormInput' required/>
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
                                <input type='text' id='crag' name='crag' value={crags} onChange={(e) => defineCrag(e.target.value)} className='modalFormInput' required/>
                            </div>
                            <div className='areasResultsBox'>
                                {searchingCrags? <CragsSearchModal data={crags} consideredArea={null}/> : null}
                            </div>
                        </div>
                        <div className = 'areasSearchBox'>
                            <div className='modalFormSubBox'>
                                <label htmlFor='climb' className='modalFormTitles'>Climb</label>
                                <input type='text' id='climb' name='climb' value={climbs} onChange={(e) => defineClimb(e.target.value)} className='modalFormInput' required/>
                            </div>
                            <div className='areasResultsBox'>
                                {searchingClimbs? <ClimbsSearchModal data={climbs} consideredCrag={null}/> : null}
                            </div>
                        </div>
                    </div>
                    <div className='modalFormBox'>
                        <div className='modalFormSubBox'>
                            <label htmlFor='grade' className='modalFormTitles'>Grade</label>
                            <select name='grade' id='grade' value={grade} onChange={(e) => getSelectedGrade(e.target.value)} className='modalFormInput' required>
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
                            <select name='type' id='type' value={type} onChange={(e) => getSelectedType(e.target.value)} className='modalFormInput' required>
                                <option value=''></option>
                                <option value='Bouldering'>Bouldering</option>
                                <option value='Sport Climbing'>Sport Climbing</option>
                                <option value='Trad Climbing'>Trad Climbing</option>
                            </select>
                        </div>
                    </div>
                    <div className='modalFormBox'>
                        <button type='button' onClick={() => submitForm(countries, areas, crags, climbs, grade, type)}>Add New Climb</button>
                    </div>
                    <div className='modalFormBox'>
                        <div>{errorMessage}</div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CreateNew;