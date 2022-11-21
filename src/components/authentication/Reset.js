import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth, sendPasswordReset } from '../firebase/Firebase';
import './Authentification.css';

const Reset = () => {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/');
    if (error) {
      alert(error, error.message)
    };
  }, [user, loading]);

  const resetPassword = () => {
    sendPasswordReset(email);
    alert('Email sent to reset your password!')
  }

  return (
    <main className="authentificationBox">
      <h3 className='authentificationTitle'>Reset your <b>Ascents</b> password profile</h3>
      <div className="authentificationFormBox">
        <label htmlFor='email' className='authentificationLabel'>Email</label>
        <input
          type="text"
          className='authentificationInput'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name='email'
        />
        <button type='button' onClick={resetPassword}>Reset Password</button>
        <div className='authentificationLabel'>
          Don't have an account? <Link to="/CreateUser" className='linkToComponent'>Register</Link> now!
        </div>
      </div>
    </main>
  );
}
export default Reset;