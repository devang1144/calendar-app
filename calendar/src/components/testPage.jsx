import React, { Component } from 'react'
import Popover from '@material-ui/core/Popover';
import '../styles/nav.scss'
export default class Test extends Component {
    state={
        type:"password",
        type2:"password"
    }
    showpassword =()=>{
        this.setState({
            type: this.state.type === 'input' ? 'password':'input'
        })
    }
    showcnfp=()=>{
        this.setState({
            type2:this.state.type2 === 'input' ? 'password':'input'
        })
    }

    render() {
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={e => this.handleSubmit(e)}>
                
                            <label htmlFor="New Password" className="mt-3">Enter New Password</label><div className="input-icons">
                            <i class="fa fa-eye show-icon" aria-hidden="true" onClick={this.showpassword}></i>
                            <input type={this.state.type} name='New Password'  id='pass1' className="form-control mb-2 input-cnf" onChange={this.handleChange}/>
                            </div>
                            <label htmlFor="New Password" className="mt-3">Confirm Password</label>
                            <div className="input-icons">
                            <i class="fa fa-eye show-icon" aria-hidden="true" onClick={this.showcnfp}></i>
                            <input type={this.state.type2} name='Confirm Password'  id='pass2' className="form-control mb-2" onChange={this.handleChange}/></div>
                            {alert}
                            <button  className="mt-3 add-signup-btn">Change password</button>
                            </form>
        </div>
        )
    }
}

//846399072508-1aj3ttvbsjduqn7kl1pjjbvge2cdmtkb.apps.googleusercontent.com