import React, { useContext, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import AlertsContext from '../context/alerts/alertsContext';

const Signup = () => {

    const context = useContext(AlertsContext);
    const {showAlert} = context;

    const [signupCredentials, setSignupCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const {name, email, password, cpassword} = signupCredentials;

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success)
        {
            //Save the authToken and redirect
            showAlert('Successfully Signed Up!')
            localStorage.setItem('token', json.authToken);
            navigate('/ autoComplete="new-password"') 
        }
        else{
            showAlert('These Credentials are already signed up!')
        }
    }

    const onChange = (e) => {
        setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container' style={{ width: '70%' }}>
            <h2>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={name} aria-describedby="name" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={email} aria-describedby="email" onChange={onChange} autoComplete="username" required />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={password} onChange={onChange} minLength={8} autoComplete="new-password" required  />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' value={cpassword} onChange={onChange} minLength={8} autoComplete="new-password" required />
                </div>
                <button disabled={password!==cpassword} type="submit" className="btn btn-dark">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup
