import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signIn, updateLastSignIn } from '../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Authentification.css';

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (error) {
      alert(error, error.message)
    };
    if (user) navigate('/');
  }, [user]);

  const signInUser = async (email, password) => {
    await signIn(email, password);
    await updateLastSignIn(email);
  }

  return (
    <main className="authentificationBox">
      <h3 className='authentificationTitle'>Sign in your <b>Ascents</b> profile</h3>
      <form className='authentificationFormBox'>
        <label htmlFor='email'  className='authentificationLabel'>Enter Email</label>
        <input
          type="text"
          id='email'
          name='email'
          autoComplete='on'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='authentificationInput'
        />
        <label htmlFor='password'  className='authentificationLabel'>Enter Password</label>
        <input
          type="password"
          id='password'
          name='password'
          autoComplete='on'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='authentificationInput'
        />
        <button type='button' onClick={() => signInUser(email, password)}>Sign In</button>
      </form>
      <div className='authentificationLabel'>
          Forgot Password? Reset your password <Link className='linkToComponent' to="/Reset">here</Link>!
      </div>
      <div className='authentificationLabel'>
          Don't have an account? Register <Link className='linkToComponent' to="/CreateUser">here</Link>!
      </div>
    </main>
  );
}
export default SignIn;