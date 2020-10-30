import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { motion } from 'framer-motion';
import Login from './googlelogin';

class Otppage extends Component {
    state = {
        email:Cookies.get('pmail'),
        cnf:false,
        data :{
            otp:""
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
        const {data:user}=await axios.post('/otppass',{email:this.state.email})
        console.log(user.resetpass)
        if(this.state.data.otp === user.resetpass){
            this.setState({
                cnf:true
            })
        }
    }
    render() {
        const otp = this.state.data;
        let m = true;
        if (otp.otp.length === 6)m=false
        console.log(this.state.data.otp)
        if(this.state.cnf){
            return <Redirect to='/cnfp' />
        }
        if(!Cookies.get('pmail')){
            return <Redirect to='/emailveri' />
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
            <div className="container-signup is-poppins d-flex justify-content-center align-items-center">
                    <div className="row row-form">
                        <motion.div className="col" initial={{y:40, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:1}}>
                            <h4 className="mb-3">Enter 6-digit verification code send to <span className="font-weight-bold">{this.state.email}</span></h4>
                            <form onSubmit={e => this.handleSubmit(e)}>
                                <input className="form-control"  id="otp" type="text" value={this.state.data.otp} onChange={this.handleRadio}/>
                                <button disabled={m} className="add-signup-btn mt-3">Proceed</button>
                            </form>
                        </motion.div>
                    </div>
                </div>
         </React.Fragment>
        );
    }
}

export default Otppage;