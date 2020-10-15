import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavSignUp from './navSignUp';
import {  Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/form';
import Input from './common/input';

export default class Signup extends Form {
    state = {
        data: {
            name:"",
            email:"",
            password:""
        },
        redirect:false,
        errors:{}
    }
    schema = {
        name:Joi.string().label("username").min(6).required(),
        email:Joi.string().email().label("E-mail").required(),
        password:Joi.string().min(6).label("password").required()
    }
    doSubmit() {
        const payload = {
            name:this.state.data.name,
            email:this.state.data.email,
            password:this.state.data.password
        }
        axios({
            url:'/api/user/register',
            method:'POST',
            data: payload
        }).then(
            this.setState({redirect:true})
        );
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/login"/>
        }
        console.log(this.state.data.name)
        return (
            <React.Fragment>
                <NavSignUp/>
            <div className="container d-flex justify-content-start ">
                <motion.form className="mt-3 rounded p-5 border" onSubmit={this.handleSubmit} initial={{y:40, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:1}}>
                    <h2 className="text-center">Sign up</h2>
                    {this.renderInput("name", "name")}
                    {this.renderInput("email", "email")}
                    {this.renderInput("password", "password", "password")}                   
                    <button disabled={this.validate()} className="btn btn-primary btn-md mt-3">Sign up</button>     
                    <p className="p-4">Already have a account, <Link to="/login">login</Link></p> 
                </motion.form>
                   
            </div>
            </React.Fragment>
        )
    }
}
