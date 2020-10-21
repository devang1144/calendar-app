import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { motion } from 'framer-motion';
import NavLogin from './NavLogin';
import Cookies from 'js-cookie';
import '../styles/login.css';

export default class LoginPage extends Component {
    state = {
            email:"",
            password:"",
            redirect:false,
            id:"",
            user:[{_id:"fjwretrgkfkg"}],
            flag:false,
            userData:[],
            userDetails:{}
        }
    handleSubmit = async(e) => {
        e.preventDefault();
        const payload = {
            email:this.state.email,
            password:this.state.password
        }
        const {data} = await axios.post('/api/user/login', payload);
        this.setState({id:jwt_decode(data)._id})
        const {data:user} = await axios.post('api/user', {_id:this.state.id})
        this.setState({userData:user})
        this.setState({redirect:true})
        console.log(user.name)
        Cookies.set('lauth',this.state.id);
        Cookies.set('uname',user.name);
        Cookies.set('IsloggedIn',true)
    }
    handleChangeMail = e => {
        const value = e.target.value;
        this.setState({
            email:value
        })
    }
    handleChangePass = e => {
        const value = e.target.value;
        this.setState({
            password:value
        })
    }
    render() {
        console.log(this.state.userData)
        if(this.state.redirect) {
            this.setState({redirect:false})
            return <Redirect to="/"/>
            
        }
        return (
            <React.Fragment>
            <NavLogin/>
            <div className="container mt-3 d-flex justify-content-start">
                <motion.form initial={{y:40, opacity:0}} 
                animate={{y:0, opacity:1}} 
                transition={{duration:1}} 
                className="m-3 rounded p-3 border" 
                onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <label for="email">email</label>
                    <input className="form-control" id="email" name="email" type="text" onChange={this.handleChangeMail} value={this.state.email}/>
                    </div>
                    <div className="form-group">
                    <label for="pass">password</label>
                    <input className="form-control" name="password" id="pass" type="password" onChange={this.handleChangePass} value={this.state.password}/>
                    </div>
                    <button className="add-event-btn is-white">Login</button> 
                    <p className="p-4">Don't have a account, <Link to="/signup">signup</Link></p>   
                </motion.form>    
            </div>
            </React.Fragment>
        )
    }
}
