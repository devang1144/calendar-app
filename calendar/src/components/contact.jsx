import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class Contact extends Component {
    
    state = {
        data :{
            name:"",
            email:"",
            query:""
        }
        
    }
    handleRadio = ({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data });
    };

    handleSubmit = (e) => {
        const data = this.state.data;
        e.preventDefault();
        const payload = {
            name:data.name,
            email:data.email,
            query:data.query
        }
        

    }
    render() {
        
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
            <div className="container-fluid align-items-center d-flex vh-100 m-0">
                <div className="container-contact-form p-4">
                    <p className="is-nunito font-weight-bold">Don't think much, just post your doubt here</p>
                    <form onSubmit={e => this.handleSubmit(e)} className="form-group d-flex flex-column">
                        <label htmlFor="" className="is-nunito">Your Name</label>
                        <input className="contact mb-3" type="text" value={this.state.data.name}/>
                        <label htmlFor="" className="is-nunito mt-2">Email</label>
                        <input className="contact mb-2" type="text" value={this.state.data.email}/>
                        <label htmlFor="" className="mt-2 is-nunito">Write your doubts here</label>
                        <textarea rows="7" className="contact-textarea is-nunito" type="textarea" value={this.state.data.query}/>
                        <button className="mt-3 add-event-btn">Send</button>
                    </form>
                    <div className="row">
                        <div className="col-md-6">
                            <Link style={{textDecoration:"none", color:"#222"}} to="/"><span className="bth">Back to Home<i class="fa pl-2 fa-arrow-right"></i></span></Link>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                </div>
            </div>
            </React.Fragment>
            
            
        )
    }
}
