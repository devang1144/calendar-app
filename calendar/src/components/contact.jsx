import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import Login from './googlelogin';
import Footer from './footer';
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
        data[input.id] = input.value;
        this.setState({ data });
    };

    handleSubmit = async(e) => {
        e.preventDefault();
        const data = this.state.data;
        const payload = {
            name:data.name,
            email:data.email,
            query:data.query
        }
        const {data:d}=  await axios.post('/user/c',payload);
        console.log(d);
        this.setState({
            data: {
                name:"",
                email:"",
                query:""
            }
        }, () => {toast.success("Response received! We'll contact you shortly")})

    }
    
    render() {
        console.log(this.state.data)
        return (
            <React.Fragment>
                <div className="container-fluid shadow-sm">
                <div className="container p-0">
                <nav class="navbar navbar-expand-lg">
                    <Link to="/" style={{textDecoration:"none", color:"#000"}}><h1 class="navbar-brand brand is-fjalla">1999 Sharp</h1></Link>
                    <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#landingPageNavbar" aria-controls="landingPageNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="icon-bar top-bar"></span>
                        <span className="icon-bar middle-bar"></span>
                        <span className="icon-bar bottom-bar"></span>
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
            <div className="container-fluid align-items-center d-flex m-0">
                <div className="container-signup is-poppins d-flex justify-content-center align-items-center">
                    <div className="row row-form">
                        <motion.div className="col" initial={{y:40, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:1}}>
                            <h1>Don't think much, just post your doubt here</h1>
                            <form onSubmit={e => this.handleSubmit(e)}>
                            <label className="mt-4" htmlFor="name">name</label>
                            <input onChange={this.handleRadio} value={this.state.data.name} className="form-control" id="name" name="name"/>
                            <label className="mt-4" htmlFor="name">email</label>
                            <input onChange={this.handleRadio} value={this.state.data.email} className="form-control" id="email" name="email"/>
                            <label className="mt-4" htmlFor="name">Write your doubts here</label>
                            <textarea rows="7" onChange={this.handleRadio} value={this.state.data.query} className="form-control is-nunito" id="query" name="query"/>
                            <button className="add-signup-btn mt-4">Send</button>
                            </form>
                            <div className="row mt-5">
                                <Link style={{textDecoration:"none", color:"#222"}} to="/"><span className="bth">Back to Home<i class="fa pl-2 fa-arrow-right"></i></span></Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={3000}/>
            <Footer/>
            </React.Fragment>
            
            
        )
    }
}

