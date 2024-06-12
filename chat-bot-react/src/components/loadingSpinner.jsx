import React from "react";
import {Spinner} from "@nextui-org/react";

function loadingSpinner () {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // This ensures the div takes the full viewport height
            width: '100vw'  // This ensures the div takes the full viewport width
        }}>
            <Spinner label="Loading..." color="secondary" labelColor="secondary"/>
        </div>
    ); 
}

export default loadingSpinner;