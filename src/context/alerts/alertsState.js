import { useState } from "react";
import AlertsContext from "./alertsContext";

const AlertsState = (props) => {

    const [alert, setAlert] = useState(null);

    const showAlert = (message) => {

        setAlert({
            message: message
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500)
    }

    return (
        <AlertsContext.Provider value={ {alert, showAlert} }>
            {props.children}
        </AlertsContext.Provider>
    )
}

export default AlertsState