import React, { useState } from 'react'
import { DisplayField } from "./DisplayField";

const DisplayFields = ({ readOnly, details }) => {
    console.log("probs1,", readOnly)


    return (
        <>
            {details.map((field) => (
                <DisplayField readOnly={readOnly} name={field.name} value={field.value} type={field.type} />
            ))}
        </>
    )
}


export default DisplayFields
