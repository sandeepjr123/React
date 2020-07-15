import React from 'react';

const Alert = ({alertType, message, focusRef}) => {

    const alertStyle = () => {
        switch (alertType) {
            case "ERROR" :
                return "alert alert-danger";
            case "SUCCESS" :
                return "alert alert-success";
            default :
                return "";                
        }
    }

    const className = alertStyle();

    return (
        <div className={className} tabIndex={-1} ref={focusRef}>
            {message}
        </div>
    );
}

export default Alert;

