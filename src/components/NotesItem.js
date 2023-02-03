import React, { useContext } from 'react'
import AlertsContext from '../context/alerts/alertsContext';
import NotesContext from '../context/notes/notesContext';

const NotesItem = (props) => {

    const { note, handleEdit } = props;

    const context = useContext(NotesContext);
    const { deleteNote } = context;

    const context1 = useContext(AlertsContext)
    const { showAlert } = context1;

    const handleDelete = (e) => {
        e.preventDefault();
        deleteNote(note._id);
        showAlert("Note has been Deleted!");
    }

    return (
        <>

            <div className="card">
                <div className="tools">
                    <div className="circle">
                        <span className="red box"></span>
                    </div>
                    <div className="circle">
                        <span className="yellow box"></span>
                    </div>
                    <div className="circle">
                        <span className="green box"></span>
                    </div>
                </div>
                <div className="card__content">
                        <div className="card col-md-3 my-3 mx-3">
                            <div className="card-body">
                                <h5 className="card-title">{note.title}</h5>
                                <p className="card-text">{note.description}</p>
                                <div className='d-dlex'>
                                    <i className="fa-solid fa-trash mx-2" id="trash" onClick={handleDelete}></i>
                                    <i className="fa-solid fa-pen-to-square mx-2" id="edit" data-bs-target="#staticBackdrop" data-bs-toggle="modal" onClick={() => { handleEdit(note) }}>
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default NotesItem
