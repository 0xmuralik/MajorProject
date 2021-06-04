import React, { useState } from 'react'
import { DisplayField } from "./DisplayField";

const DisplayFields = ({ readOnly, details }) => {

    return (
        <>
            {details.map((field) => (
                <DisplayField readOnly={readOnly} name={field.name} value={field.value} type={field.type} />
            ))}
        </>
    )
}


export default DisplayFields
