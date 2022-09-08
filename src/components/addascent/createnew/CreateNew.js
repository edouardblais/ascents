import React, { useState } from 'react';
import { addNewClimb } from '../../firebase/Firebase';

const CreateNew = () => {
    const [country, setCountry] = useState('');
    const [area, setArea] = useState('');
    const [crag, setCrag] = useState('');
    const [climb, setClimb] = useState('');
    const [type, setType] = useState('');
    const [grade, setGrade] = useState('');

    const defineCountry = (countryvalue) => {
        setCountry(countryvalue);
    };

    const defineArea = (areavalue) => {
        setArea(areavalue);
    };

    const defineCrag = (cragvalue) => {
        setCrag(cragvalue);
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

    return (
        <div>
            <h1>Add New Climb</h1>
            <form>
                <label htmlFor='country'>Country</label>
                <input type='text' id='country' name='country' onChange={(e) => defineCountry(e.target.value)}/>

                <label htmlFor='area'>Area</label>
                <input type='text' id='area' name='area' onChange={(e) => defineArea(e.target.value)}/>

                <label htmlFor='crag'>Crag</label>
                <input type='text' id='crag' name='crag' onChange={(e) => defineCrag(e.target.value)}/>

                <label htmlFor='route'>Route</label>
                <input type='text' id='route' name='route' onChange={(e) => defineClimb(e.target.value)}/>

                <select name='grade' id='grade' onChange={(e) => getSelectedGrade(e.target.value)}>
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

                <select name='type' id='type' onChange={(e) => getSelectedType(e.target.value)}>
                    <option value='boulder'>Boulder Problem</option>
                    <option value='sport'>Sport Climb</option>
                    <option value='trad'>Trad Climb</option>
                </select>

                <button type='button' onClick={() => addNewClimb(country, area, crag, climb, grade, type)}>Add New Climb</button>
            </form>
        </div>
    )
}

export default CreateNew;