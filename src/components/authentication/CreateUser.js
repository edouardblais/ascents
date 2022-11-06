import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from "../firebase/Firebase";
import './Authentification.css';

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
    <div className='authentificationBox'>
      <h3 className='authentificationTitle'>Register with <b>Ascents</b></h3>
      <form className='authentificationFormBox'>
        <label htmlFor='name' className='authentificationLabel'>Full Name</label>
        <input
          type='text'
          className='authentificationInput'
          id='name'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className='authentificationLabel' htmlFor='email'>Email</label>
        <input
          type='email'
          className='authentificationInput'
          name='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className='authentificationLabel' htmlFor='password'>Password</label>
        <input
          type='password'
          className='authentificationInput'
          name='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='button' onClick={register}>Register</button>
      </form>
      <div className='authentificationLabel'>
        Already have an account? <Link className='linkToComponent' to="/SignIn">Login</Link> now!
      </div>
    </div>
  );
}
export default CreateUser;