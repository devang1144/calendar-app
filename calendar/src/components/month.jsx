import React, { Component } from 'react'
import axios from 'axios';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
export default class Lists extends Component {
    state = {
        events:[],
        ev:[],
        eventThatDay:[],
        eventname:"",
        data: {
            editEvent:""
        }
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
    componentDidMount = () => {
        const length = this.props.ev === undefined ? 0 : this.props.ev.length;
        if (length) {
            this.setState({ev:this.props.ev});
        }
        
        this.setState({eventThatDay:this.props.eventThatDay});        
    }
    handleDelete = async(e, id) => {
        console.log(this.id)
        const {data:newEvent} = await axios.put(`/api/user/${Cookies.get('lauth')}/${id}`);
        console.log(newEvent);
    }
    handleEdit = async(e, id) => {
        const payload = {
            newEvent : this.state.data.editEvent
        }
        const {data:newEvent} = axios.put(`api/user/e/${Cookies.get('lauth')}/${id}`, payload);
        console.log(newEvent);
    }
    displayEvents() {
        const length = this.props.ev === undefined ? 0 : this.props.ev.length;
        if(length) {
            return (
                <motion.table className="table events-table shadow p-0 m-2 events" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:1}}>
                    <thead>
                        <th>Event</th>
                        <th>Created on</th>
                        <th>Scheduled On</th>
                        <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                    </thead>
                    <tbody>
                    {this.props.ev.map(m => 
                            <tr className="p-0 is-poppins is-white">
                                <td><span className="eventName">{m.eventName}</span></td>
                                <td className="text-info">{m.moment.split("T")[0]}</td>
                                <td className="text-danger">{m.eventDate}</td>
                                <td className="d-flex">
                                <OverlayTrigger
                                    rootClose
                                    trigger="click"
                                    placement="top"
                                    overlay={
                                        <Popover className="edit-popover">
                                        <Popover.Title as="h3" className="popover-title">New event</Popover.Title>
                                        <Popover.Content>
                                        <form onSubmit={e => this.handleEdit(e, m._id)} className="form-group p-5">
                                            <label htmlFor="event">Edit Event </label>
                                            <input name="editEvent" onChange={this.handleRadio} value={this.state.data.editEvent} className="form-control add-event" id="event" type="text"/>
                                            <button className="add-event-btn">add event<i className="fa fa-plus pl-2 mt-1 pr-2" style={{color:"#000"}}></i></button>
                                        </form>
                                        </Popover.Content>
                                        </Popover>
                                    }
                                    >
                                    <i class="fa fa-pencil pr-2" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                <i className="fa fa-trash pl-2" onClick={(e) => this.handleDelete(e, m._id)}></i>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    
                </motion.table>
            );
        }
        else {
            return (
                <span className="is-white i-page is-poppins">No events added</span>   
            );
        }
    }
    displayEventForThisMonth() {
        return (
            <motion.table className="table events-table shadow p-0 m-2 events" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:1}}>
                    <thead>
                        <th>Events</th>
                        <th>Scheduled On</th>
                        <th>&nbsp;&nbsp;&nbsp;</th>
                    </thead>
                    <tbody>
                    {this.props.eventThatDay.map(m => 
                            <tr className="p-0 is-poppins is-white">
                                <td><span className="eventName">{m.eventName}</span></td>
                                <td><span className="eventName text-danger">{m.eventDate}</span></td>
                                <td className="d-flex">
                                <OverlayTrigger
                                    rootClose
                                    trigger="click"
                                    placement="top"
                                    overlay={
                                        <Popover className="edit-popover">
                                        <Popover.Title as="h3" className="popover-title">New event</Popover.Title>
                                        <Popover.Content>
                                        <form onSubmit={e => this.handleEdit(e, m._id)} className="form-group p-5">
                                            <label htmlFor="event">Edit Event </label>
                                            <input name="editEvent" onChange={this.handleRadio} value={this.state.data.editEvent} className="form-control add-event" id="event" type="text"/>
                                            <button className="add-event-btn">add event<i className="fa fa-plus pl-2 mt-1 pr-2" style={{color:"#000"}}></i></button>
                                        </form>
                                        </Popover.Content>
                                        </Popover>
                                    }
                                    >
                                    <i class="fa fa-pencil pr-2" aria-hidden="true"></i>
                                    </OverlayTrigger>
                                <i className="fa fa-trash pl-2" onClick={(e) => this.handleDelete(e, m._id)}></i>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    
                </motion.table>
        );
    }
    displayEventForThisDay() {
        return (
            <motion.table className="table events-table shadow p-0 m-2 events" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:1}}>
                    <thead>
                        <th>Events</th>
                        <th>Scheduled On</th>
                        <th>&nbsp;&nbsp;&nbsp;</th>
                    </thead>
                    <tbody>
                    {this.props.eventOnThatDay.map(m => 
                            <tr className="p-0 is-poppins is-white">
                                <td><span className="eventName">{m.eventName}</span></td>
                                <td><span className="eventName text-danger">{m.eventDate}</span></td>
                                <td className="d-flex">
                                <OverlayTrigger
                                    rootClose
                                    trigger="click"
                                    placement="top"
                                    overlay={
                                        <Popover className="edit-popover">
                                        <Popover.Title as="h3" className="popover-title">New event</Popover.Title>
                                        <Popover.Content>
                                        <form onSubmit={e => this.handleEdit(e, m._id)} className="form-group p-5">
                                            <label htmlFor="event">Edit Event </label>
                                            <input name="editEvent" onChange={this.handleRadio} value={this.state.data.editEvent} className="form-control add-event" id="event" type="text"/>
                                            <button className="add-event-btn">add event<i className="fa fa-plus pl-2 mt-1 pr-2" style={{color:"#000"}}></i></button>
                                        </form>
                                        </Popover.Content>
                                        </Popover>
                                    }
                                    >
                                    <i class="fa fa-pencil pr-2"></i>
                                    </OverlayTrigger>
                                <i className="fa fa-trash pl-2" onClick={(e) => this.handleDelete(e, m._id)}></i>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    
                </motion.table>
        );
    }

    render() {
        console.log(this.state.data.editEvent)
        return (
            <div> 
                <div className="d-inline">
                    <h1 className="is-white is-poppins mt-4 ml-2 m-5">My Dashboard<i className="fa pl-3 fa-car" aria-hidden="true"></i></h1>
                </div>
                <div className="row m-0">
                    <div className="col-md-7 p-5">
                        <h3 className="is-white is-poppins pb-2 pl-2">Scheduled Events<i className="fa pl-3 text-danger fa-clock-o" aria-hidden="true"></i></h3>
                        {this.displayEvents()}
                        
                    </div>
                    <div className="col-md-5 p-5">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="is-white is-poppins pb-2 pl-2">Events this month<i style={{color:"#4CAD79"}} className="fa pl-2 fa-calendar-o text-success" aria-hidden="true"></i></h3>
                                {this.displayEventForThisMonth()}
                            </div>
                            <div className="col-md-12 mt-5">
                            <h3 className="is-white is-poppins pb-2 pl-2">Event {this.props.selectedDay ? `on ${this.props.dateContext.format("MMMM")} ${this.props.selectedDay}, ${this.props.dateContext.format("YYYY")}`:"today"}</h3>
                                {this.displayEventForThisDay()}
                            </div>
                        </div>
                    
                    </div>
                </div>
                       
            </div>
        )
    }
}
