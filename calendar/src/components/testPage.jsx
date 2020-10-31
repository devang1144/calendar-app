import React, { Component } from 'react'
import Popover from '@material-ui/core/Popover';
import '../styles/nav.scss'
import TimePicker from 'react-time-picker'
import TimeKeeper from 'react-timekeeper';
export default class Test extends Component {
    state={
        type:"password",
        type2:"password",
        time:"10:00"
    }
    showpassword =()=>{
        this.setState({
            type: this.state.type === 'input' ? 'password':'input'
        })
    }
    Onchangetime=time=>{
        this.setState({
            time:time
        })
    }
    showcnfp=()=>{

        this.setState({ 
            type2:this.state.type2 === 'input' ? 'password':'input'
        })
    }

    render() {
        console.log(this.state.time)

        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={e => this.handleSubmit(e)}>
                
                            <label htmlFor="New Password" className="mt-3">Enter New Password</label>
                            
                            <input type={this.state.type} name='New Password'  id='pass1' className="form-control mb-2 input-cnf" onChange={this.handleChange}/>
                            <span onClick={this.showpassword} class="fa fa-fw fa-eye field-icon "></span>
                            <div class="form-group">
                            <label htmlFor="New Password" className="mt-3">Confirm Password</label>
                            <div class="col-md-10">
                            
                            
                            <input type={this.state.type2} name='Confirm Password'  id='pass2' className="form-control mb-2" onChange={this.handleChange}/>
                            <span onClick={this.showcnfp} class="fa fa-fw fa-eye field-icon"></span>
                            </div>  
                            </div>
                            {alert}
                            <button  className="mt-3 add-signup-btn">Change password</button>
                            
                           
                            
                            <input id="password-field" type="password" class="form-control" name="password" value="secret"></input>
                            
                            
                            </form>
                            <div>
                            <TimeKeeper
                                time={this.state.time}
                                onChange={(data) => this.setState({
                                    time:data.formatted24
                                })}
                            />
                            {/* <span>Time is {this.state.time}</span> */}
                            </div>
                                                    {/* <div>
                                <TimePicker
                                onChange={this.Onchangetime}
                                value={this.state.time}
                                locale="sv-sv"
                                maxTime="23:59"
                                />
                            </div> */}
        </div>
       
        )
    }
}

//846399072508-1aj3ttvbsjduqn7kl1pjjbvge2cdmtkb.apps.googleusercontent.com