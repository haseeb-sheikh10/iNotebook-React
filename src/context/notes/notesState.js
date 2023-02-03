import { useContext, useState } from "react";
import LoaderContext from "../loader/loaderContext";
import NotesContext from "./notesContext";

const NotesState = (props) => {

    const context = useContext(LoaderContext);
    const { setLoading } = context;

    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);

    const host = 'http://localhost:5000/api/notes';

    // FETCH ALL NOTES
    const fetchNotes = async () => {

        //API CALL
        setLoading(true);
        setTimeout( async () => {
            const response = await fetch(`${host}/fetchNotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setLoading(false);
            setNotes(json);
        }, 500)
        
    }


    // Add a note
    const addNote = async (title, description, tag) => {

        //API CALL
        setLoading(true);
        setTimeout( async () => {
            const response = await fetch(`${host}/addNote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });
            const note = await response.json();
            setLoading(false);
            setNotes(notes.concat(note));
            // console.log(note);
        }, 500)
       
    }


    // delete a note
    const deleteNote = async (id) => {

        //API CALL
        const response = await fetch(`${host}/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();
        console.log(json);

        setNotes(
            notes.filter((note) => { return note._id !== id })
        )
    }


    // edit a note
    const editNote = async (id, title, description, tag) => {

        //API CALL
        const response = await fetch(`${host}/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        //Logic to edit in client side
        let newNotes = await JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i]._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NotesContext.Provider value={{ notes, fetchNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesState;