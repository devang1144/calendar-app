import React, { Component } from 'react'
import moment from 'moment';
import Cookies from 'js-cookie'
import Func from './calendar_functions';
import {Link} from 'react-router-dom';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import '../styles/calender.scss'
export default class Year extends Func {
    weekdaysShort = moment.weekdaysShort();
    months = moment.months();
    year = (m) => {
        return m.format("Y");
    }
    month = (m) => {
        return m.format("MMMM");
    }
    daysInMonth = (m) => {
        return m.daysInMonth();
    }
    currentDate = (m) => {
        return m.get("date");
    }
    currentDay = (m) => {
        return m.format("D");
    }

    firstDayOfMonth = (m) => {
        let dateContext = m;
        let firstDay = moment(dateContext).startOf('month').format('d'); 
        return firstDay;
    }
    renderWeekDays() {
        let weekdays = this.weekdaysShort.map((day) => 

                <td key={day} className="week-day">{day}</td>
        );
        return weekdays;
    }

    renderNavBar() {
        
        return (
            <nav className="navbar m-0 navbar-expand-lg navbar-sticky-top">
                    <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navLinks" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navLinks">
                        <div className="navbar-nav ml-auto">
                        <Link to="/Year"><span className="p-2 navLinks nav-item nav-link">Year</span></Link>
                        <Link to="/"><span className="p-2 navLinks nav-item nav-link">month</span></Link>
                        <span className="p-2 navLinks nav-item nav-link">week</span>
                        <i className="fa fa-list-ul p-2" style={{fontSize:24}}></i> 
                        </div>
                            
                    </div>
            </nav>
        );
    } 

    renderMonths() {
        let allMonths=[];
        const colors = ["#000"];
        for(let i=0;i<12;i++) {
            let monthNo = i;
            let dateContext = Object.assign({}, moment());
            dateContext = moment().set("month", monthNo);
            allMonths.push({dateContext:dateContext,color:colors[0]});
        }
        return (
            <React.Fragment>
            <div className="row">
                {allMonths.map(m => 
                    <div className="col-md-4 p-5">
                        <h3 className=" is-poppins" style={{color:`${m.color}`}}><span className="month-name p-2">{m.dateContext.format("MMMM")}</span></h3>
                        <table className="table">
                            <tbody>
                            <tr>
                            {this.renderEachMonth(m.dateContext)}
                            </tr>  
                            </tbody>
                        </table>
                    </div>
                        
                    )}                    
            </div>
            </React.Fragment>
        );
    }

    renderEachMonth(m) {
        const today = moment().date();
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(m); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">
                {""}
                </td>
            );
        }   
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(m); d++) {
            daysInMonth.push(
                
                // <OverlayTrigger
                // rootClose
                // trigger="click"
                // placement="top"
                // overlay={
                //     <Popover className="edit-popover">
                //     <Popover.Title as="h3" className="popover-title">New event{d ===  today? " today":(d === today+1 ? " tomorrow":` on ${d}th`)}</Popover.Title>
                //     <Popover.Content>
                //     <form onSubmit={e => this.handleSubmit(e, Cookies.get('lauth'))} className="form-group p-5">
                //         <label htmlFor="event">Add Event {this.props.selectedDay ? `on ${this.props.dateContext.format("MMMM")} ${this.state.selectedDay}, ${this.state.dateContext.format("YYYY")}`:"today"}</label>
                //         <input name="eventName" onChange={this.handleRadio} value={this.state.data.eventName} className="form-control add-event" id="event" type="text"/>
                //         <button className="add-event-btn">add event<i className="fa fa-plus pl-2 mt-1 pr-2" style={{color:"#000"}}></i></button>
                //     </form>
                //     </Popover.Content>
                //     </Popover>
                // }
                // > 
                <td key={d} className="day-year p-2 text-center">
                    <span className="p-0 is-poppins" onClick={(e)=>{this.ondayClickYear(e, d, m)}}>{d}</span>
                </td>
            // </OverlayTrigger>
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
        return [trElems];
    }
    render() {
        console.log(Cookies.get('lauth'))
        return (
            <div className="container-fluid background-left">            
                {this.renderMonths()}
            </div>
        )
    }
}
