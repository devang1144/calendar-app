import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

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
            <div className="container-email-verify d-flex justify-content-center align-items-center">
                <form onSubmit={e => this.handleSubmit(e)} className="form-group d-flex flex-column">
                        <label htmlFor="" className="is-nunito mt-2">An Otp has been sent to your email </label>
                        <input className="contact mb-2" id="otp" type="text" value={this.state.data.otp} onChange={this.handleRadio}/>
                        <button className="mt-3 add-event-btn">Proceed</button>
                </form>
            </div>
            <div className="">
                    {/*<p className="is-nunito font-weight-bold">Don't think much, just post your doubt here</p>*/}
                    
                    
            </div>
            
            </React.Fragment>
        );
    }
}

export default Otppage;