import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Emailveri extends Component {
    
    state = {
        data :{

            email:"",
            resetpass:""

        }
        
    }
    handleRadio = ({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.id] = input.value;
        this.setState({ data });
    };

    handleSubmit = async(e) => {
        e.preventDefault();
        const data = this.state.data;
        
        // const {data:d}=  await axios.post('/user/c',payload);
        // console.log(d);
        // this.setState({
        //     data: {
        //         name:"",
        //         email:"",
        //         query:""
        //     }
        // }, () => {toast.success("Response received! We'll contact you shortly")})

    }
    
    render() {
        console.log(this.state.data)
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
            <div className="d-flex align-items-center">
                    {/*<p className="is-nunito font-weight-bold">Don't think much, just post your doubt here</p>*/}
                    <form onSubmit={e => this.handleSubmit(e)} className="form-group d-flex flex-column">
                        <label htmlFor="" className="is-nunito mt-2">Enter Your Registered Email</label>
                        <input className="contact mb-2" id="email" type="text" value={this.state.data.email} onChange={this.handleRadio}/>
                        <button className="mt-3 add-event-btn">Get One Time Password</button>
                    </form>
                    
                </div>
            
            </React.Fragment>
            
            
        )
    }
}
