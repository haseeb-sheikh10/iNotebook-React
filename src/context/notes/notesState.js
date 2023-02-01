import { useState } from "react";
import NotesContext from "./notesContext";

const NotesState = (props) => {

    const s1 = {
        name: "haseeb",
        age: 22
    }
    const [state, setState] = useState(s1);

    const update = () => {
        setTimeout(() => {
            setState({
                name: "irfan",
                age: 46
            })
        }, 1000);

    }
    return (
        <NotesContext.Provider value={{state, update}}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesState;