import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Joi from 'joi-browser';
import Cookies from 'js-cookie';
import axios from 'axios';

class ConfirmPswd extends Component {
    state = {
        email:Cookies.get('pmail'),
        cnf:false,
        data :{
            pass1:"",
            pass2:""
        }
        
    }
    schema = {
        pass1:Joi.string().min(6).label("Password").required()
    }
    handleRadio = ({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.id] = input.value;
        this.setState( { data });
    };

    handleSubmit = async(e) => {
        // const token= jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
        e.preventDefault();
        const payload={
            email:this.state.email,
            pass1:this.state.pass1
        }
        const {data:user} = await axios.put('/otppass',payload)

        this.setState({
            cnf:true
        })
    }
    
    render() {
        if(this.state.cnf){
            return <Redirect to='/login' />
        }
        return (
            <React.Fragment>
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
                        <Link style={{textDecoration:"none"}} className="sign-up is-nunito" to="/"><span className="">sign up for free</span></Link>
                        </div>
                    </div>
                </nav>
                </div>   
            </div>
                <div className="container-email-verify d-flex justify-content-center align-items-center ">
                <form onSubmit={e => this.handleSubmit(e)} className="form-group d-flex flex-column">
                    <label for="New Password" className="mt-3">Enter New Password</label>
                    <input type='password' name='New Password'  id='pass1' className="contact mb-2">
                    </input>
                    {/* <label for="Confirm Password" className="mt-3">Password</label>
                    <input type='password' name='Confirm Password' id='pass2' className="contact mb-2">
                    </input> */}
                    <button className="mt-3 add-event-btn">Set this one</button>
                </form>
            </div>
            </React.Fragment>
            
        );
    }
}

export default ConfirmPswd;