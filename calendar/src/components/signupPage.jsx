import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavSignUp from './navSignUp';
import {  Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/form';
import Login from './googlelogin';
import '../styles/login.css';
import Footer from './footer';

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
        name:Joi.string().label("Username").min(6).required(),
        email:Joi.string().email().label("Email").required(),
        password:Joi.string().min(6).label("Password").required()
    }
    doSubmit() {
        const payload = {
            kind:"internal",
            name:this.state.data.name,
            email:this.state.data.email,
            password:this.state.data.password
        }
        axios({
            url:'http://localhost:1234/api/user/register',
            method:'POST',
            data: payload
        })
        .then(() => console.log("wedfejhwf"))
        .then(
            this.setState({redirect:true})
        )
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/login"/>
        }
        return (
            <React.Fragment>
                <div className="container-fluid-signup">
                <div className="container-fluid shadow-sm">
                <div className="container">
                <nav class="navbar navbar-expand-lg">
                    <Link to="/" style={{textDecoration:"none", color:"#000"}}><h1 class="navbar-brand brand is-fjalla">1999 Sharp</h1></Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#landingPageNavbar" aria-controls="landingPageNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon m-1"></span>
                        <span class="navbar-toggler-icon m-1"></span>
                        <span class="navbar-toggler-icon m-1"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="landingPageNavbar">
                        <div class="navbar-nav ml-auto align-items-center">
                        <Link style={{textDecoration:"none", color:"#000"}} className="mr-3 is-nunito" to="/faq">FAQ</Link>
                        <Link style={{textDecoration:"none", color:"#000"}} className="mr-3 is-nunito" to="/login">sign in</Link>
                        </div>
                    </div>
                </nav>
                </div>   
            </div>
                <div className="container-signup is-poppins d-flex justify-content-start align-items-center">
                    <div className="row row-form">
                        <motion.div className="col" initial={{y:40, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:1}}>
                            <h1>Welcome, Create your account</h1>
                            <h3 className="mt-2">Enter your email and create a password</h3>
                            <form onSubmit={this.handleSubmit}>
                            <label className="mt-4" htmlFor="name">name</label>
                            <input onChange={this.handleChange} className="form-control" id="name" name="name"/>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="mt-4" htmlFor="name">email</label>
                                    <input onChange={this.handleChange} className="form-control" id="email" name="email"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="mt-4" htmlFor="name">password</label>
                                    <input onChange={this.handleChange} type="password" className="form-control" id="password" name="password"/>
                                </div>
                            </div>
                            <button className="add-signup-btn">Signup</button>
                            </form>
                            <h6 className="mt-3">ALready have a account, <Link to="/login">Login</Link><br/></h6>
                            <span className="mt-3">or</span>
                            <Login class="sign-up  ml-2 border-0 m-2"/>
                            <div className="row mt-5">
                                <Link style={{textDecoration:"none", color:"#222"}} to="/"><span className="bth">Back to Home<i class="fa pl-2 fa-arrow-right"></i></span></Link>
                            </div>
                            
                        </motion.div>
                    </div>
                </div>
                </div>
            </React.Fragment>
        )
    } 
}
