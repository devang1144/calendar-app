import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Login from './googlelogin';
import '../styles/calender.scss';
import Cookies from 'js-cookie';
import Otppage from './otp'
import Footer from './footer'
export default class Emailveri extends Component {
    
    state = {
        cnfp:false,
        data :{

            email:""

        }
        
    }
    handleRadio = ({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.id] = input.value;
        this.setState( { data });
    };

    handleSubmit = async(e) => {
        e.preventDefault();
        const data = this.state.data;
        console.log(this.state.data )
        const msg= await axios.put('/api/user/login',{"email":this.state.data.email});
        console.log(msg)
        Cookies.set('pmail',this.state.data.email);
        console.log(Cookies.get('pmail'))
        this.setState({
            cnfp:true
        })

    }
    
    render() {
        console.log(this.state.data)
        if(this.state.cnfp){
            return <Redirect to='/otp' />
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
            <div className="container-signup is-poppins d-flex justify-content-start align-items-center">
                    <div className="row row-form">
                        <motion.div className="col" initial={{y:40, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:1}}>
                            <h2>Forgot Password</h2>
                            <form onSubmit={e => this.handleSubmit(e)}>
                                <label for="email">Enter Your Registered Email</label>
                                <input className="form-control"  id="email" type="text" value={this.state.data.email} onChange={this.handleRadio}/>
                                <button className="add-signup-btn mt-3">Get One Time Password</button>
                            </form>
                                <p className="pt-4">Don't have a account, <Link to="/signup">signup</Link></p>
                                <span>or</span>
                                <Login class="sign-up  ml-2 border-0 m-2"/>
                            <div className="row mt-5">
                                <Link style={{textDecoration:"none", color:"#222"}} to="/"><span className="bth">Back to Home<i class="fa pl-2 fa-arrow-right"></i></span></Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </React.Fragment>
            
            
        )
    }
}
