import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signIn, updateLastSignIn } from '../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

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
    <div className="signin">
      <form className="signin-container">
        <label htmlFor='email'>Enter Email</label>
        <input
          type="text"
          id='email'
          name='email'
          className="signin-textbox"
          autoComplete='on'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <label htmlFor='password'>Enter Password</label>
        <input
          type="password"
          id='password'
          name='password'
          className="signin-textbox"
          autoComplete='on'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button 
          type='button'
          className="signin-btn"
          onClick={() => signInUser(email, password)}
        >
          Sign In
        </button>
      </form>
      <div>
          Forgot Password? Reset your password <Link to="/Reset">here</Link>
        </div>
        <div>
          Don't have an account? Register <Link to="/CreateUser">here</Link>
        </div>
    </div>
  );
}
export default SignIn;