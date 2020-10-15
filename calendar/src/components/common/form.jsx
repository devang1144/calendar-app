import React, { Component } from 'react'
import Joi from 'joi-browser';
import Input from './input';
export default class Form extends Component {
   
    validate = () => {
        const options = { abortEarly:false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if(!error) return null;

        const errors = {};
        for(let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };
    validateProperty = ({name, value}) => {
        const obj = {[name]: value};
        const schema = {[name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };
    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {} });
        this.doSubmit();
    };
    handleChange = ({currentTarget:input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, errors});
    };
    renderInput(name, label, type="string") {
        const { data, errors } = this.state;
        return (
            <Input
            error={errors[name]}
            name={name}
            label={label}
            placeholder={label}
            value={data[name]}
            id={name}
            type={type}
            onChange={this.handleChange}/> 
            );
    };
    render() {

        
        return (
            <div>
                
            </div>
        )
    }
}
