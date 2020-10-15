import React, { Component } from 'react'

const Radio = (props) => {
        return (
            <form className="form-check">
                <input type="radio" id={props.id} name={props.name} onChange={props.handleRadio} value={props.value}/>
                <label htmlFor={props.id}></label>
            </form>
        )
}

export default Radio;