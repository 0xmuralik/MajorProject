import React from 'react'
import Form from 'react-bootstrap/Form'

export const DisplayField = ({ readOnly, name, value, type }) => {

    const [val,changeValOnChange]=React.useState(value);
    function handleOnChange(event){
        changeValOnChange(event.target.value)
    }
    const render = readOnly ?
        <Form.Group >
            <Form.Label>{name}</Form.Label>
            <Form.Control type={type} readOnly value={value} />
        </Form.Group> :
        <Form.Group >
            <Form.Label>{name}</Form.Label>
            <Form.Control onChange={handleOnChange} type={type}  value={val} />
        </Form.Group>
    return (
        <div>
            {render}
        </div>
    )
}


export default DisplayField
