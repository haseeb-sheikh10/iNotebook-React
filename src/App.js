import React from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { Route, Routes } from 'react-router-dom';
import NotesState from './context/notes/notesState';

function App() {
  return (
    <>

      <NotesState>
        <Navbar />
        <Routes>
          <Route exact path='/home' element={<Home />}/>
          <Route exact path='/about' element={<About />}/>
        </Routes>
      </NotesState>
    </>
  );
}

export default App;
