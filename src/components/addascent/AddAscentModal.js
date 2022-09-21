import React, { useEffect, useState } from 'react';
import { addAscentToLogbook, getUserInfoByEmail } from '../firebase/Firebase';

const AddAscentModal = ({climb, useremail}) => {
    const today = new Date();
    const formattedToday = today.toLocaleDateString();

    const [grade, setGrade] = useState(climb.grade);
    const [feel, setFeel] = useState('');
    const [rp, setRP] = useState('redpoint');
    const [rating, setRating] = useState('0');
    const [recommendation, setRecommendation] = useState(false);
    const [comment, setComment] = useState('');
    const [date, setDate] = useState(formattedToday);

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const user = getUserInfoByEmail(useremail);
        user.then((resolvedUser) => {
            setUserInfo(resolvedUser[0]);
        })
    }, [])

    const getSelectedGrade = (gradevalue) => {
        setGrade(gradevalue);
    };

    const getSelectedFeel = (feelvalue) => {
        setFeel(feelvalue);
    };

    const getSelectedRP = (rpvalue) => {
        setRP(rpvalue);
    };

    const getSelectedRating = (ratingvalue) => {
        setRating(ratingvalue);
    };

    const isRecommended = () => {
        if (recommendation === false) {
            setRecommendation(true);
        } else if (recommendation === true) {
            setRecommendation(false);
        }
    }

    const getComment = (commentvalue) => {
        setComment(commentvalue);
    };

    const getSelectedDate = (datevalue) => {
        setDate(datevalue);
    };

    return (
        <div>
            <div>
                <p>{climb.climb}</p>
                <p>{climb.crag} {climb.area} {climb.country}</p>
                <p>{climb.grade}</p>
                <p>{climb.type}</p>
            </div>
            <form>
                <label htmlFor='date'>Date of send</label>
                <input type='date' id='date' name='date' defaultValue={date} onChange={(e) => getSelectedDate(e.target.value)}></input>

                <select name='rp' id='rp' defaultValue={rp} onChange={(e) => getSelectedRP(e.target.value)}>
                    <option value='redpoint'>Redpoint</option>
                    <option value='onsight'>Onsight</option>
                    <option value='flash'>Flash</option>
                </select>

                <label htmlFor='grade'>Grade</label>
                <select name='grade' id='grade' defaultValue={grade} onChange={(e) => getSelectedGrade(e.target.value)}>
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

                <label htmlFor='feel'>Grade feel</label>
                <select name='feel' id='feel' defaultValue={feel} onChange={(e) => getSelectedFeel(e.target.value)}>
                    <option value=''></option>
                    <option value='soft'>Soft</option>
                    <option value='hard'>Hard</option>
                </select>

                <label htmlFor='rating'>Rating</label>
                <select name='rating' id='rating' defaultValue={rating} onChange={(e) => getSelectedRating(e.target.value)} >
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                </select>

                <button type='button' onClick={isRecommended}>Recommended?</button>

                <label htmlFor='comment'>Comment:</label>
                <input type='text' id='comment' name='comment' defaultValue={comment} onChange={(e) => getComment(e.target.value)}></input>

                <button type='button' onClick={() => addAscentToLogbook(climb, grade, feel, rp, rating, recommendation, comment, date, userInfo)}>Add Ascent</button>

            </form>
        </div>
    )
}

export default AddAscentModal;