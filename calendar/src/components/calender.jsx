import React from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import list from '../assets/list.svg';
import { Link } from 'react-router-dom';
import Func from './calendar_functions';
import axios from 'axios';
import Joi from 'joi-browser';
import '../styles/calender.scss';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import Year from './Year';
import Lists from './month';
import Week from './weeks';
import Clock from './Clock';
import ArrowDown from '../assets/arrow_down.svg';
import Logout from './googleLogout';
export default class Calendar extends Func {
    state = {
        dateContext: moment(),
        year:"",
        yearError:"",
        currentDateContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false,
        eventThatDay:[],
        eventOnThatDay:[],
        selectedDay: moment().get("date"),
        popoverOpen:false,
        events:[],
        show:false,
        todo:"",
        isOpen:false,
        data: {
            qwerty:"2",
            user:[], 
            eventName:""
        },
        logStatus:true,
        uname1:Cookies.get('uname'),
    }
    // schema={
    //     year:Joi.number().min(4).max(4).label("Year").required()
    // }
    componentDidMount = async() => {
        const userId = Cookies.get('lauth');
        if (userId) {
            this.setState({
                logStatus:true
            })
        }
        else {
            this.setState({
                logStatus:false
            })
        }
        const {data:user} = await axios.post('/api/user', {_id:Cookies.get('lauth')});
        if (user) {
            this.setState({
                data: {
                    user,
                },
                logStatus:true
            })
        }
    }
    
    displayEvents() {

    }
    togglePopover = () => {    
        this.setState({ popoverOpen: !this.state.popoverOpen })  
      }
      handleClick = () => {
        this.setState({
            show:!this.state.show
        })
    }
    weekdays = moment.weekdays(); 
    weekdaysShort = moment.weekdaysShort(); 
    months = moment.months();
    handleChange = e => {
        const value = e.target.value;
        this.setState({todo:value});
    }
    handleOpen = () => {
        this.setState({ isOpen: true })
      }
    
      handleClose = () => {
         this.setState({ isOpen: false })
      }
    calendarNav = () => {
        return (
            <nav className="navbar shadow-sm navbar-right m-0 navbar-expand-lg navbar-sticky-top">
                <div className="navbar-text">
                </div>
                    <div className="col d-flex justify-content-start align-items-center flex-row">
                        <div className="dropdown p-2">
                            <span className="is-poppins">{this.state.dateContext.format("MMMM")}</span>
                        <div className="dropdown-content m-0">
                            <ul className="">
                                {this.months.map(m => 
                                    <li className="is-white" onClick={(e)=> {this.changeMonth(e, m)}}>
                                        <span className="dropdown-months">{m}</span>
                                    </li> 
                                    )}
                                
                            </ul>
                        </div>
                    </div>
                    <div className="co">
                    <input
                        defaultValue = {this.year()}
                        className="form-control year-value"
                        ref={(yearInput) => { this.yearInput = yearInput}}
                        onKeyUp= {(e) => this.onKeyUpYear(e)}
                        name="yearInput"
                        onChange = {(e) => this.onYearChange(e)}
                        type="number"
                        value={this.state.year}
                        placeholder="year"/>
                    </div>
                    <p className={this.state.yearError.length === 0 ? "" : "ml-2 p-2 my-auto alert alert-danger"}>{this.state.yearError}</p>
                    </div>
                    
                    <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navLinks" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="row d-flex justify-content-center">
                        <div className="col">
                        <div className="collapse navbar-collapse">
                        <div className="navbar-nav is-white">
                        {this.renderRadio("qwerty", "Year", "year", this.handleRadio, "1")}
                        {this.renderRadio("qwerty", "Dashboard", "month", this.handleRadio, "2")}
                        {this.renderRadio("qwerty", "week", "week", this.handleRadio, "3")}     
                        </div> 
                    </div>
                        </div>
                    </div>
                    
                    <div className="collapse navbar-collapse justify-content-end">
                    <i class="fa  p-2 fa-bell-o" aria-hidden="true"></i>
                        <i class="fa p-2 mr-2 fa-inbox" aria-hidden="true"></i>
                    <form className="form-search" action="">
                        <input className="search-input-box" type="search" placeholder="search events.."/>
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                    </div>
            </nav>
        );
    }

    showDifferentComp(eventThatMonth) {
        const user = this.state.data.user;
        if (this.state.data.qwerty === "1") {
            return (
                <motion.div initial={{y:10, opacity:0}} animate={{y:-10, opacity:1}} transition={{duration:0.5}}>
                    <Year dateContext={this.state.dateContext} eventThatDay={eventThatMonth} selectedDay={this.state.selectedDay}/>
                </motion.div>
            );
        }
        else if(this.state.data.qwerty === "2"){
            return <Lists ev={user.events} eventThatDay={eventThatMonth} selectedDay={this.state.selectedDay} dateContext={this.state.dateContext} eventOnThatDay={this.state.eventOnThatDay}/>
        }
        else if (this.state.data.qwerty === "3"){
            return <Week/>
        }
        else {
             return <Lists ev={user.events} eventThatDay={eventThatMonth} selectedDay={this.state.selectedDay} dateContext={this.state.dateContext} eventOnThatDay={this.state.eventOnThatDay}/>
            //return <Week  today={this.state.dateContext}/>
        }
    }
     
    logOut = async() => {
        const data = await Cookies.remove('lauth');
        
        this.setState({
            user:[]
        },()=>{
            Cookies.remove('uname')
            
        })
        this.setState({
            logStatus:false
        }, () => {console.log(this.state.logStatus)})
    }

    displayUserName(name) {
        if (name === undefined)return;
        return name;
    }
    logoutButton() {
        const user = this.state.data.user
        const kind = user.accounts === undefined ? null : user.accounts[0].kind;
        if(kind === "Google") {
            // this.setState({
            //     logStatus:false
            // })
            return <Logout/>
        }
        
        else {
            return (
                <div>
                {this.state.logStatus && <button className="is-white add-event-btn cursor-p" onClick={this.logOut}>Logout</button> }
                </div>
            );
        }
    }
    
    render() {
        console.log(this.state.dateContext.year(), this.state.today.year())
        if(!this.state.logStatus){
            console.log(this.state.logStatus)
            return <Redirect to="/"/>
        }
        const events = this.state.data.user.events;
        const eventThatDay = [];
        const date = this.state.dateContext;
        const thatDay = date.format("MMM,YYYY");
        const length = (events === undefined) ? 0: events.length;
        for (let i=0;i<length;i++) {
            if(thatDay === events[i].eventDate.split(" ")[1]) {
                eventThatDay.push({_id:events[i]._id, eventName:events[i].eventName, eventDate:events[i].eventDate})
                
            }
        }
        
        let eventThatMonth = eventThatDay.map(m => {return(<span>{m.eventName}</span>)})
        
        const colors = ["#ffc600", "#63A92C", "#BF30F1", "#A92C42", "#FDC04B", "#2FA5D8", "#D82F43"];
        const week = [];
        for (let i=0;i<7;i++) {
            
            week.push({weekday:this.weekdaysShort[i], color:colors[i]});
        }
        let weekdays = week.map((day) => {
            return (
                <td key={day} className="week-day"><strong>{day.weekday}</strong></td>
            )
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">
                {""}
                </td>
            );
        }
        let class1 = "day p-2 rounded text-center";
        let daysInMonth = []; 
        //calendar days
        for (let d = 1; d <= this.daysInMonth(); d++) {
            daysInMonth.push(
                <td key={d} id="tddd"> 
                    <span  className={
                        (d === this.state.today.date() && (this.state.dateContext.month() === this.state.today.month())
                         && (this.state.dateContext.year() === this.state.today.year())) ? "today "+class1:" "+class1} 
                         onClick={e => this.onDayClick(e,this.state.data.user.events , d)}>{d}</span>
                </td>    
            );
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });
        let trElems = rows.map((d, i) => {
            return (
                <tr key={i*100} className="">
                    {d}
                </tr>
            );
        })
        
        return (
            <div className="container-fluid landingContainer m-0" style={this.style}>
                <div className="row landing-page-row">
                
                <div className="col-md-3 vh-100 p-0 right">
                    <nav className="navbar navbar-left navbar-fixed m-0">
                        <div className="navbar-brand">
                            <h2 className="app-name">1999 Sharp</h2>  
                        </div>
                        <div className="navbar-nav d-flex flex-row ml-auto">
                        <h4 className="p-3 is-white">{Cookies.get('uname')}</h4>
                        </div>
                    </nav>
                    <nav className="navbar m-0">
                    <i onClick={e => this.prevMonth()} className="fa p-3 fa-2x fa-angle-left cursor-p"></i>
                    <h4 className="navbar-brand is-poppins mt-4 mb-4 todays-date">{this.month()}, {this.currentDate()} {moment().format('dddd')}</h4>
                        <i onClick={e => this.nextMonth()} className="fa p-3 fa-2x fa-angle-right"></i>
                        <div className=" justify-content-end">
                            {(!this.state.logStatus) && <Link style={{textDecoration:"none"}} to="/signup"><span className="p-2 navLinks is-white">signup</span></Link>}
                            {!this.state.logStatus && <Link style={{textDecoration:"none"}} to="/login"><span className="p-2 navLinks is-white">login</span></Link>}
                            {this.logoutButton()}
                        </div>
                    </nav>
                    <span>
                            
                    </span>
                    
                <motion.table className="table" initial={{y:10, opacity:0}} animate={{y:-20, opacity:1}} transition={{duration:0.7}}>
                    <thead>
                    </thead>
                    <tbody>
                        <tr className="is-poppins week-rows">
                            {weekdays}
                        </tr >
                        {trElems}
                    </tbody>
                </motion.table>
                <div className="row m-0 d-flex justify-content-around">
                   
                </div>
                <form onSubmit={e => this.handleSubmit(e, this.state.data.user._id)} className="form-group p-5">
                    <label htmlFor="event">Add Event {this.state.selectedDay ? `on ${this.state.dateContext.format("MMMM")} ${this.state.selectedDay}, ${this.state.dateContext.format("YYYY")}`:"today"}</label>
                    <input name="eventName" onChange={this.handleRadio} value={this.state.data.eventName} className="form-control add-event" id="event" type="text"/>
                    <button className="add-event-btn" disabled={this.state.data.eventName === undefined ? true: (this.state.data.eventName.length === 0 ? true:false)}>add event<i className="fa fa-plus pl-2 mt-1 pr-2" style={{color:"#000"}}></i></button>
                </form>
                </div>
                <div className="col-md-9 p-0 left">
                    {this.calendarNav()}
                    {this.showDifferentComp(eventThatDay)}
                </div>
                </div>
                
                
                
            </div>

        );
    }
    
}