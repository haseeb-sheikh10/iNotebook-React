import React, { useState, useContext } from 'react'
import AlertsContext from '../context/alerts/alertsContext';
import NotesContext from '../context/notes/notesContext';

const AddNote = () => {

    const context = useContext(NotesContext);
    const { addNote } = context;

    const context1 = useContext(AlertsContext)
    const { showAlert } = context1;

    const handleClick = (e) => {
        e.preventDefault();
        addNote(newNote.title, newNote.description, newNote.tag);
        setNewNote({
            title: "",
            description: "",
            tag: ""
        })
        showAlert("Note has been added!")
    }

    const [newNote, setNewNote] = useState({
        title: "",
        description: "",
        tag: ""
    })

    const onChange = (e) => {
        setNewNote({ ...newNote, [e.target.name]: e.target.value })
    }

    return (
        <div>

            <div className='container my-3' style={{ width: "80%" }}>
                <h3>Add a Note</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" onChange={onChange} className="form-control" id="title" name="title" value={newNote.title} aria-describedby="noteTitle" minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" onChange={onChange} className="form-control" id="description" name="description" value={newNote.description} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" onChange={onChange} className="form-control" id="tag" name="tag" value={newNote.tag} minLength={5} />
                    </div>
                    <button disabled={newNote.title.length < 5 || newNote.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
