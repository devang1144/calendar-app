import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { motion } from 'framer-motion';
import NavLogin from './NavLogin';
import Cookies from 'js-cookie';
import Emailveri from './emailveri';
import Login from './googlelogin';
import '../styles/login.css';
import Footer from './footer';

export default class LoginPage extends Component {
    state = {
            data: {
                email:"",
                password:""
            },
            redirect:false,
            id:"",
            user:[{_id:"fjwretrgkfkg"}],
            flag:false,
            userData:[],
            userDetails:{},
            type:"password"
        }
    handleSubmit = async(e) => {
        e.preventDefault();
        const payload = {
            email:this.state.data.email,
            password:this.state.data.password
        }
        const {data} = await axios.post('/api/user/login', payload);
        this.setState({id:jwt_decode(data)._id})
        const {data:user} = await axios.post('api/user', {_id:this.state.id})
        this.setState({userData:user})
        this.setState({redirect:true})
        console.log(user.accounts[0].uid)
        Cookies.set('lauth',this.state.id);
        Cookies.set('uname',user.accounts[0].uid);
        Cookies.set('IsloggedIn',true)
    }
    handleInputChange = ({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data });
    };
    showpassword =()=>{
        this.setState({
            type:"input"
        })
    }
    render() {
        console.log(this.state.data)
        if(this.state.redirect) {
            this.setState({redirect:false})
            return <Redirect to="/loading"/>
            
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
                        <Link style={{textDecoration:"none", color:"#000"}} className="mr-3 is-nunito" to="/signup">sign up</Link>
                        <Link style={{textDecoration:"none", color:"#000"}} className="mr-3 is-nunito" to="/contact">contact</Link>
                        </div>
                    </div>
                </nav>
                </div>   
            </div>
                <div className="container-signup is-poppins d-flex justify-content-start align-items-center">
                    <div className="row row-form">
                        <motion.div className="col" initial={{y:40, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:1}}>
                            <h1>Login</h1>
                            <form onSubmit={this.handleSubmit}>
                                <label for="email">email</label>
                                <input className="form-control mb-3" id="email" name="email" type="text" onChange={this.handleInputChange} value={this.state.email}/>
                                <label for="pass">password</label>
                                <input className="form-control" name="password" id="pass" type="password" onChange={this.handleInputChange} value={this.state.password}/>
                                <button className="add-signup-btn mt-3">Login</button>
                            </form>
                                <p className="pt-4">Don't have a account, <Link to="/signup">signup</Link></p>
                                <span>or</span>
                                <Login class="sign-up  ml-2 border-0 m-2"/>
                                <p className="mt-3"><Link to="/emailveri">Forgot password</Link></p> 
                                
                            <div className="row mt-3">
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
