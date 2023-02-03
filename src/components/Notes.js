import React, { useContext, useEffect, useRef, useState } from 'react'
import NotesItem from './NotesItem'
import NotesContext from '../context/notes/notesContext'
import AlertsContext from '../context/alerts/alertsContext';
import { useNavigate } from 'react-router-dom';
import LoaderContext from '../context/loader/loaderContext'
import Loader from './Loader'

const Notes = () => {

    const context = useContext(NotesContext);
    const { notes, fetchNotes, editNote } = context;

    const context1 = useContext(AlertsContext)
    const { showAlert } = context1;

    const ref = useRef(null);

    const handleEdit = (currentNote) => {
        ref.current.click();
        setUpdatedNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag
        });
    }

    const [updatedNote, setUpdatedNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: ""
    })

    const onChange = (e) => {
        setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value })
    }

    const refClose = useRef(null);
    const handleClick = () => {
        editNote(updatedNote.id, updatedNote.etitle, updatedNote.edescription, updatedNote.etag);
        refClose.current.click();
        showAlert("Note has been Edited!")
    }

    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('token')) {
            fetchNotes();
        }
        else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const context2 = useContext(LoaderContext)
    const { loading } = context2;


    return (
        <>
            <div>
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="editModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" onChange={onChange} className="form-control" id="etitle" name="etitle" value={updatedNote.etitle} aria-describedby="noteTitle" minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <input type="text" onChange={onChange} className="form-control" id="edescription" name="edescription" value={updatedNote.edescription} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label">Tag</label>
                                        <input type="text" onChange={onChange} className="form-control" id="etag" name="etag" value={updatedNote.etag} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={updatedNote.etitle.length < 5 || updatedNote.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='container' style={{ width: "80%", alignItems: 'center' }}>
                <h3 className='my-3'>Your Notes</h3>
                <div className='d-flex justify-content-center'>
                    {loading && <Loader />}
                </div>
                {notes.length !== 0 ? <div className='row'>
                    {notes.map((note) => {
                        return <NotesItem key={note._id} note={note} handleEdit={handleEdit} />
                    })}
                </div>:!loading && <p>No Notes to Preview</p>}
            </div>
        </>
    )
}

export default Notes
