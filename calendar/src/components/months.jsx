import React, { Component } from 'react'
import moment from 'moment';
import Func from './calendar_functions';
export default class Months extends Component {
    state = {
        dateContext:moment()
    }

    weekdays = moment.weekdays();
    weekdaysShort = moment.weekdaysShort();


    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d'); 
        return firstDay;
    }

    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }

    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext
        });
    }

    renderMonth = () => {
        
    }
    
    render() {
        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <td key={day} className="week-day">{day}</td>
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
                <td key={d} className="days">
                    <span className="" onClick={(e)=>{this.onDayClick(e, d)}}>{d}</span>
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
                <tr key={i*100} className="week-rows">
                    {d}
                </tr>
            );
        })
        return (
            <div>
                <table className="table">
                    <thead>
                    </thead>
                    <tbody>
                        <tr className="week-rows">
                            {weekdays}
                        </tr >
                        {trElems}
                    </tbody>
                </table>
            </div>
        )
    }
}
