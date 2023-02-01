import React, { useContext, useEffect } from 'react'
import NotesContext from '../context/notes/notesContext'

const Home = () => {
  
  const a = useContext(NotesContext)
  
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      I am {a.state.name} and my age is {a.state.age} 
    </div>
  )
}

export default Home
