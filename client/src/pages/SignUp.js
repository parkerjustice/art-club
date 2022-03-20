import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

//Signup page
function SignUp () {

    const [formState, setFormState] = useState({ username: '', email: '', password: '' });

    // useMutation prepares JS function that wraps around our muttation code and returns it to us
    // returns in the form of addUser, ability to check errors
    const [addUser, { error }] = useMutation(ADD_USER);

    const InputChange = (event) => {
        const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

    //submit form
    const formSubmit = async event => {
        event.preventDefault();

        // use try/catch instead of promises to handle errors
        try {
            // execute addUser mutation and pass in variable data from form
            const { data } = await addUser({
            variables: { ...formState }
            });
            //takes token and adds to localstorage
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="">
            <form className = "">

            <h1 className=" ">Sign Up!</h1>
                <input 
                    className="input-form"
                    placeholder="User Name"
                    value={formState.username}
                    name="username"
                    onChange={InputChange}
                    type="username"

            />
                
                <input 
                    className="input-form"
                    value={formState.email}
                    name="email"
                    onChange={InputChange}
                    type="email"
                    placeholder="email@email.com"
            />
         
                <textarea 
                    className="input-form"
                    value={formState.password}
                    name="password"
                    onChange={InputChange}
                    type="password"
                    placeholder="**********"
            />               
             
            
            </form>
            <button className="btn" type="button" onClick={formSubmit}>Submit!</button>
            {error && <div>Sign up failed</div>}
        </div>
    )
}

export default SignUp