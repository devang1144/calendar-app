import React from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import list from '../assets/list.svg';
import { Link } from 'react-router-dom';
import Func from './calendar_functions';
import axios from 'axios';
import '../styles/calender.scss';
import Cookies from 'js-cookie';
import Year from './Year';
import Lists from './month';
import Week from './weeks';
import ArrowDown from '../assets/arrow_down.svg';
export default class Calendar extends Func {
    state = {
        dateContext: moment(),
        currentDateContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false,
        selectedDay: null,
        popoverOpen:false,
        events:[],
        show:false,
        todo:"",
        data: {
            qwerty:"2",
            user:[], 
            eventName:""
        },
        logStatus:false,
        uname1:Cookies.get('uname'),
    }
    componentDidMount = async() => {
        const userId = Cookies.get('lauth');
        this.getEvents();
        const {data:user} = await axios.post('/api/user', {_id:Cookies.get('lauth')});
        this.setState({
            data: {
                user,
            },
            logStatus:true
        })
        console.log(this.state.data.user.events)
    }
    
    getEvents = async() => {
        const {data:events} =  await axios.get('/api/listItems');
        this.setState({events});
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
    handelSubmit = e => {
        e.preventDefault();
        const payload = {
            todo:this.state.todo,
            day:this.state.dateContext.date(),
            month:this.state.dateContext.month(),
            year:this.state.dateContext.year()
        }
        axios.post('/api/listItems', payload)
        .then(console.log("event added!"));
    }

    calendarNav = () => {
        return (
            <nav className="navbar navbar-left m-0 navbar-expand-lg navbar-sticky-top">
                <div className="navbar-text">
                </div>
                    <div className="col d-flex justify-content-start align-items-center flex-row">
                    
                    
                    <DropdownButton size="md" title={this.month()} className="month-button p-2">
                            {this.months.map(m => 
                                <Dropdown.Item onClick={(e)=> {this.changeMonth(e, m)}}> 
                                    {m}
                                </Dropdown.Item>
                            )}
                        </DropdownButton>
                    <input
                        defaultValue = {this.year()}
                        className="form-control year-value"
                        ref={(yearInput) => { this.yearInput = yearInput}}
                        onKeyUp= {(e) => this.onKeyUpYear(e)}
                        onChange = {(e) => this.onYearChange(e)}
                        type="number"
                        placeholder="year"/>
                    </div>
                    <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navLinks" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="row d-flex justify-content-center">
                        <div className="col">
                        <div className="collapse navbar-collapse">
                        <div className="navbar-nav is-white">
                        {this.renderRadio("qwerty", "Year", "year", this.handleRadio, "1")}
                        {this.renderRadio("qwerty", "month", "month", this.handleRadio, "2")}
                        {this.renderRadio("qwerty", "week", "week", this.handleRadio, "3")}     
                        </div> 
                    </div>
                        </div>
                    </div>
                    
                    <div className="collapse navbar-collapse justify-content-end">
                    <form className="form-search" action="">
                        <input className="search-input-box" type="search" placeholder="search events.."/>
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                    </div>
            </nav>
        );
    }

    showDifferentComp() {
        if (this.state.data.qwerty === "1") {
            return (
                <motion.div initial={{y:10, opacity:0}} animate={{y:-10, opacity:1}} transition={{duration:0.5}}>
                    <Year/>
                </motion.div>
            );
        }
        else{
            return <Lists ev={this.state.data.user.events}/>
        }
        // else{
        //     return <Lists />
        // }
    }
    logOut = async() => {
        const data = await Cookies.remove('lauth');
        this.setState({
            logStatus:false
        })
        this.setState({
            user:[]
        })
        Cookies.remove('uname')
        // Cookies.set('IsLoggedIn',false)
    }

    displayUserName(name) {
        if (name === undefined)return;
        return name;
    }
    handleSubmit = async (e) => {
        const id = Cookies.get('lauth') ? Cookies.get('lauth') : console.log("fmklsdg"); 
        e.preventDefault();
        const event = {
            eventName:this.state.data.eventName,
            eventDate:(this.state.selectedDay) + (this.state.dateContext.month()) + (this.state.dateContext.year()),
            moment:this.state.currentDateContext._d
        };
         const { data:res } = await axios.post(`/api/user/${id}`, event);
        console.log(res);        

    }
    render() {
        console.log(this.state.data.user.events)
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
        
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            daysInMonth.push(
                <td key={d} id="tddd" className={d === this.state.today.date() ? "today dropdown days":"dropdown days"}>
                <span className="day p-2 rounded text-center" onClick={e => this.onDayClick(e, d)}>{d}</span>
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
                <div className="row">
                
                <div className="col-md-4 vh-100 p-0 right">
                    <nav className="navbar m-0">
                        <div className="navbar-brand">
                        <i className="fa p-2  fa-calendar-o is-white"></i>
                        <i class="fa  p-2 fa-bell-o text-info" aria-hidden="true"></i>
                        <i class="fa p-2  fa-inbox" aria-hidden="true"></i>
                        </div>
                        <div className="navbar-nav d-flex flex-row ml-auto">
                        <h4 className="p-3 is-white">{Cookies.get('uname')}</h4>
                        
                        <img src={ArrowDown} className="dropdown img img-fluid pb-2 logout-section" alt=""/>
                        <div className="dropdown-content m-0">
                            <ul className="list-group">
                                <li className="list-group-item">Rural Sports</li>
                                <li className="list-group-item">Quality Education</li>
                                <li className="list-group-item">Vocational training</li>
                            </ul>
                        </div>
                        </div>
                        
                    </nav>
                    <nav className="navbar m-0">
                        <h4 className="navbar-brand is-poppins mt-4 date-heading mb-4">{this.month()}, {this.currentDate()} {moment().format('dddd')}</h4>
                        <div className=" justify-content-end">
                        <i className="fa fa-list-ul p-2" style={{fontSize:24}}></i> 
                            {!this.state.logStatus && <Link style={{textDecoration:"none"}} to="/signup"><span className="p-2 navLinks">signup</span></Link>}
                            {!this.state.logStatus && <Link style={{textDecoration:"none"}} to="/login"><span className="p-2 navLinks">login</span></Link>}
                            {this.state.logStatus && <span className="is-white" onClick={this.logOut}>Logout</span> }
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
                    <i onClick={e => {this.prevMonth()}} className="fa p-3 arrow fa-arrow-left"></i>
                    <i onClick={e => {this.nextMonth()}} className="fa p-3 arrow fa-arrow-right"></i>
                </div>
                <form onSubmit={e => this.handleSubmit(e, this.state.data.user._id)} className="form-group">
                    <label htmlFor="event">Event</label>
                    <input name="eventName" onChange={this.handleRadio} value={this.state.data.eventName} className="form-control" id="event" type="text"/>
                    <button className="btn btn-primary">add event<i className="fa fa-plus pl-2 pt-1" style={{color:"#89C283"}}></i></button>
                </form>
                </div>
                <div className="col-md-8 p-0 left">
                    {this.calendarNav()}
                    {this.showDifferentComp()}
                </div>
                </div>
                
                
                
            </div>

        );
    }
}