import React from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { Route, Routes } from 'react-router-dom';
import NotesState from './context/notes/notesState';
import AlertsState from './context/alerts/alertsState';
import Signup from './components/Signup';
import Login from './components/Login';
import LoaderState from './context/loader/loaderState';

function App() {
  return (
    <>
      <LoaderState>
        <AlertsState>
          <NotesState>
            <Navbar />
            <div className='container'>
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/about' element={<About />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/signup' element={<Signup />} />
              </Routes>
            </div>
          </NotesState>
        </AlertsState>
      </LoaderState>
    </>
  );
}

export default App;
