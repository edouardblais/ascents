import React, { useEffect, useState } from 'react';
import { addAscentToLogbook, getUserInfoByEmail } from '../firebase/Firebase';
import './Modal.css';

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

    const [closeModal, setCloseModal] = useState(false);

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

    const hideModal = () => {
        setCloseModal(true)
    }

    const addAscent = () => {
        addAscentToLogbook(climb, grade, feel, rp, rating, recommendation, comment, date, userInfo);
        setCloseModal(true);
    }

    return (
        <div className={closeModal?'display-none':'modal'}>
            <div className='modalClimbInfo'>
                <div className='modalClimbInfoTop'>
                    <h4 className='noMargin'>{climb.climb}</h4>
                    <h4 className='noMargin'>{climb.grade}</h4>
                </div>
                <div className='modalClimbInfoBottom'>
                    <h5 className='noMargin'>{climb.crag} - {climb.area} - {climb.country}</h5>
                    <h5 className='noMargin'>{climb.type}</h5>
                </div>
            </div>
            <form className='modalForm'>
                <div className='modalFormBox'>
                    <div className='modalFormSubBox'>
                        <label htmlFor='date' className='modalFormTitles'>Date of send</label>
                        <input type='date' id='date' name='date' defaultValue={date} onChange={(e) => getSelectedDate(e.target.value)} className='modalFormInput'></input>
                    </div>
                    <div className='modalFormSubBox'>
                        <label htmlFor='rp' className='modalFormTitles'>Style</label>
                        <select name='rp' id='rp' defaultValue={rp} onChange={(e) => getSelectedRP(e.target.value)} className='modalFormInput'>
                            <option value='redpoint'>Redpoint</option>
                            <option value='onsight'>Onsight</option>
                            <option value='flash'>Flash</option>
                        </select>
                    </div>
                </div>
                <div className='modalFormBox'>
                    <div className='modalFormSubBox'>
                        <label htmlFor='grade' className='modalFormTitles'>Grade</label>
                        <select name='grade' id='grade' defaultValue={grade} onChange={(e) => getSelectedGrade(e.target.value)} className='modalFormInput'>
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
                        <label htmlFor='feel' className='modalFormTitles'>Grade feel</label>
                        <select name='feel' id='feel' defaultValue={feel} onChange={(e) => getSelectedFeel(e.target.value)} className='modalFormInput'>
                            <option value=''></option>
                            <option value='soft'>Soft</option>
                            <option value='hard'>Hard</option>
                        </select>
                    </div>
                    <div className='modalFormSubBox'>
                        <label htmlFor='rating' className='modalFormTitles'>Rating</label>
                        <select name='rating' id='rating' defaultValue={rating} onChange={(e) => getSelectedRating(e.target.value)} className='modalFormInput'>
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                        </select>
                    </div>
                </div>
                <div className='modalFormSubBox'>
                    <label htmlFor='comment' className='modalFormTitles'>Comment</label>
                    <textarea type='textarea' id='comment' name='comment'  rows="5" cols="40" defaultValue={comment} onChange={(e) => getComment(e.target.value)} className='modalFormInput'></textarea>
                </div>
                <div className='modalFormBox'>
                    <div>
                        <button type='button' onClick={isRecommended} className={recommendation? 'recommended' : null}>{recommendation? 'Recommended!' : 'Recommended?'}</button>
                    </div>
                    <div>
                        <button type='button' onClick={addAscent}>Add Ascent!</button>
                    </div>
                </div>
            </form>
            <div className='closeAddAscentModalBox'>
                <button onClick={hideModal} aria-label='close modal button'><span className="material-symbols-outlined">close</span></button>
            </div>
        </div>
    )
}

export default AddAscentModal;