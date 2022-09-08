import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signIn } from '../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen component
      return;
    }
    if (user) navigate('/');
    console.log(user);
  }, [user, loading]);

  return (
    <div className="signin">
      <div className="signin-container">
        <input
          type="text"
          className="signin-textbox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          type="password"
          className="signin-textbox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="signin-btn"
          onClick={() => signIn(email, password)}
        >
          Sign In
        </button>
        <div>
          <Link to="/Reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/CreateUser">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default SignIn;