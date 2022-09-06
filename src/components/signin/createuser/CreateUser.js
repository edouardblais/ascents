import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateUser = () => {

    let email = '';
    let password = '';
    let repeatedpassword = '';

    const onChange = (e) => {
        if (e.id === 'password') {
            password = e.value;
        } else if (e.id === 'repeatedpassword') {
            repeatedpassword = e.value;
        } else if (e.id === 'email') {
            email = e.value;
        }
    }

    const createUser = () => {

    //https://blog.logrocket.com/user-authentication-firebase-react-apps/

        if (password === repeatedpassword && password !== '') {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
        }
    }

    return (
        <div>
            <h1>Create User</h1>

            <form method='post'>

                <fieldset>
                    <legend>Sign in details</legend>

                    <label htmlFor='email'>Enter your email address</label>
                    <input type='email' id='email' name='email' onChange={(e)=>onChange(e)}/>

                    <label htmlFor='password'>Choose a password</label>
                    <input type='password' id='password' name='password' onChange={(e)=>onChange(e)}/>

                    <label htmlFor='repeatedpassword'>Enter your password again</label>
                    <input type='password' id='repeatedpassword' name='repeatedpassword' onChange={(e)=>onChange(e)}/>

                    <button onClick={createUser}>Create User</button>

                </fieldset>

            </form>
            
        </div>
    )
}

export default CreateUser;