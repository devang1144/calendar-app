import React, { Component } from 'react'
import axios from 'axios';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
export default class Lists extends Component {
    state = {
        events:[],
        ev:[]
    }
    renderRadio(name, label, id, onChange, value, ...rest) {
        return (<div className="form-check">
                    <input {...rest} className="radio" type="radio" name={name} value={value} onChange={onChange} id={id}/>
                    <label className="radio-labels is-white is-poppins" htmlFor={id}>{label}</label>
                </div>
            );
    };
    handleRadio = ({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data });
    };
    componentDidMount = async() => {
        const {data:events} = await axios.get("api/listItems");
        this.setState({events});
        const { data: user } = await axios.get('/api/user/login')
        this.setState({ev:this.props.ev});
    }
    displayEvents() {
        if(this.state.ev) {
            return (
                <motion.table className="table events-table shadow p-0 m-2 events" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:1}}>
                    <thead>
                        <th>Event</th>
                        <th>Created on</th>
                        <th>Scheduled On</th>
                        <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                    </thead>
                    <tbody>
                    {this.state.ev.map(e => 
                            <tr className="p-0 is-poppins is-white">
                                <td><span className="eventName">{e.eventName}</span></td>
                                <td className="text-info">{e.moment.split("T")[0]}</td>
                                <td className="text-danger">{e.eventDate}</td>
                                <td className="d-flex"><i class="fa fa-pencil pr-2" aria-hidden="true"></i>
                                <i className="fa fa-trash pl-2"></i>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    
                </motion.table>
            );
        }
        else {
            return (
                <Link to="/login" className="is-white">Login to use</Link>   
            );
        }
    }
    render() {
        return (
            <div> 
                <div className="d-inline">
                    <h1 className="is-white is-poppins mt-4 ml-2 m-5">My Dashboard<i class="fa pl-2 text-dark fa-calendar-check-o" aria-hidden="true"></i></h1>
                    
                </div>
                <div className="row m-0">
                    <div className="col-md-7 p-5">
                        <h3 className="is-white is-poppins pb-2 pl-2">Scheduled Events<i class="fa pl-3 text-danger fa-clock-o" aria-hidden="true"></i></h3>
                        {this.displayEvents()}
                        
                    </div>
                    <div className="col d-flex justify-content-end">
                        <h4 className="is-white p-4">add event<i className="fa fa-plus p-2" style={{color:"#89C283"}}></i></h4>
                    </div>
                </div>
                       
            </div>
        )
    }
}
