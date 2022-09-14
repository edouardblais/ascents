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
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (error) alert(error, error.message);
    if (user) navigate('/');
  }, [user, loading]);

  return (
    <div className='register'>
      <div className='register-container'>
        <input
          type='text'
          className='register-textbox'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Full Name'
        />
        <input
          type='text'
          className='register-textbox'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email Address'
        />
        <input
          type='password'
          className='register-textbox'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button className='register-btn' onClick={register}>
          Register
        </button>
        <div>
          Already have an account? <Link to="/SignIn">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default CreateUser;