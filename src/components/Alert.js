import React, { useContext } from 'react'
import AlertsContext from '../context/alerts/alertsContext'

const Alert = () => {
    const context = useContext(AlertsContext)
    const { alert } = context

    return (
        <div style={{height: '50px', marginTop: '0px'}}>
            {alert && <div className="alert alert-info" role="alert">
                {alert.message}
            </div>}
        </div>
    )
}

export default Alert