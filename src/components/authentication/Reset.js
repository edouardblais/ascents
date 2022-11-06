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
  }, [user, loading]);

  return (
    <div className="authentificationBox">
      <div className="reset-container">
        <input
          type="text"
          className="reset-textbox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <button
          className="reset-btn"
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/CreateUser">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Reset;