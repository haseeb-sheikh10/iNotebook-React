import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertsContext from '../context/alerts/alertsContext';


const Login = () => {

    const context = useContext(AlertsContext);
    const { showAlert } = context;

    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: ""
    });

    const { email, password } = loginCredentials;

    let navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/loginUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            //Save the authToken and redirect
            showAlert('Successfully Logged In!')
            localStorage.setItem('token', json.authToken)
            navigate("/")
        }
        else {
            showAlert('Please Use Valid Credentials to Log In!')
        }
    }

    const onChange = (e) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container mt-3' style={{ width: '70%' }}>
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={email} aria-describedby="email" onChange={onChange} autoComplete="current-password" required />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={password} onChange={onChange} minLength={8} autoComplete="current-password" required />
                </div>
                <button disabled={password.length < 8} type="submit" className="btn btn-dark">SIGN IN</button>
            </form>
        </div>
    )
}

export default Login
