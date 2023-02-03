import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AlertsContext from '../context/alerts/alertsContext';
import Alert from './Alert';
import logo from './iNotebook-logo.png'

const Navbar = () => {

  const context = useContext(AlertsContext);
  const {showAlert} = context;
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    showAlert("Logged Out Successfully!")
    localStorage.removeItem('token');
    navigate('/login')
  }

  return (
    <div className='fixed-top'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <img src={logo} rel="iNotebook Logo" alt="iNotebook Logo"></img>
          <Link className="navbar-brand mx-3" to="/" style={{ fontFamily: 'Montserrat' }}><b>iNotebook</b></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link disabled={localStorage.getItem('token') === null} className={`nav-link ${location.pathname === '/home' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link disabled={localStorage.getItem('token') === null} className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<div className="d-flex">
              <Link className="btn btn-primary mx-1" to='/login' role='button'>LOGIN</Link>
              <Link className="btn btn-danger mx-1" to='/signup' role='button'>SIGN UP</Link>
            </div>:<button className="btn btn-dark" onClick={handleLogout}>Logout</button>}
          </div>
        </div>
      </nav>
      <Alert/>
    </div>
  )
}

export default Navbar
