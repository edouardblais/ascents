import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import {
  auth,
  registerWithEmailAndPassword,
} from "../firebase/Firebase";

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const register = () => {
    if (!name) alert('Please enter your name');
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (error) alert(error, error.message);
    if (user) navigate('/');
  }, [user, loading]);

  return (
    <div className='register'>
      <form className='register-container'>
        <label htmlFor='name'>Full Name</label>
        <input
          type='text'
          className='register-textbox'
          id='name'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type='email'
          className='register-textbox'
          name='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email Address'
        />
        <input
          type='password'
          className='register-textbox'
          name='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button type='button' className='register-btn' onClick={register}>
          Register
        </button>
      </form>
      <div>
        Already have an account? <Link to="/SignIn">Login</Link> now.
      </div>
    </div>
  );
}
export default CreateUser;