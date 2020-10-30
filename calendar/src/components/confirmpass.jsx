import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Joi from 'joi-browser';
import Cookies, { set } from 'js-cookie';
import axios from 'axios';
import Form from './common/form';

class ConfirmPswd extends Component {
    state = {
        email:Cookies.get('pmail'),
        cnf:false,
        data :{
            pass1:"",
            pass2:"",
            
        },
        isMatching:true
    }

    handleChange = ({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.id] = input.value;
        this.setState( { data });
    };

    handleSubmit = async(e) => {
        // const token= jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
        e.preventDefault();
        const payload={
            email:this.state.email,
            pass1:this.state.data.pass1
        }
        await axios.put('/otppass',payload).then(res=> console.log(res))

        this.setState({
            cnf:true
        })
    }
    
    render() {
        const pass = this.state.data;
        let m = true;
        if (pass.pass1 === pass.pass2 && pass.pass1.length >= 6)m=false;
        else {
            m=true;
        }
        let alert = <div></div>
        if (pass.pass1.length <= pass.pass2.length && pass.pass1 !== pass.pass2) {
            alert = <div class="alert alert-danger" role="alert">
            password does not match
          </div>
        }
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
                <form onSubmit={e => this.handleSubmit(e)} className="form-group border p-4 d-flex flex-column">
                    <label htmlFor="New Password" className="mt-3">Enter New Password</label>
                    <input type='password' name='New Password'  id='pass1' className="contact mb-2" onChange={this.handleChange}/>
                    <label htmlFor="New Password" className="mt-3">Confirm Password</label>
                    <input type='password' name='Confirm Password'  id='pass2' className="contact mb-2" onChange={this.handleChange}/>
                    {alert}
                    <button disabled={m} className="mt-3 add-event-btn">Change password</button>
                    
                </form>
            </div>
            </React.Fragment>
            
        );
    }
}

export default ConfirmPswd;