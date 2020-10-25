import React, { Component } from 'react'
import moment from 'moment';
import { StaticRouter } from 'react-router-dom';
export default class Week extends Component{
    
    state = {
        dateArray : [],
          
    }
    displayWeeks() {
        const props = this.props.today;
        for(let i=1;i<=7;i++) {
            this.state.dateArray.push({date:props.get("date") + i - props.day() - 1, day:moment.weekdaysShort()[i-1]})
        }
        return(
            <thead>
                <th></th>
                {this.state.dateArray.map(m => 
                    <th>{m.day}<br/>{m.date}</th>
                )}
            </thead>
        );
    }
    render () { 
        return (
            <div className="m-4">
               <table className="table">
                   {this.displayWeeks()}
                   <tbody>
                       <tr>00:00</tr>
                       <tr>01:00</tr>
                       <tr>02:00</tr>
                       <tr>03:00</tr>
                       <tr>04:00</tr>
                       <tr>05:00</tr>
                       <tr>06:00</tr>
                       <tr>07:00</tr>
                       <tr>08:00</tr>
                       <tr>09:00</tr>
                       <tr>10:00</tr>
                       <tr>11:00</tr>
                       <tr>12:00</tr>
                       <tr>13:00</tr>
                       <tr>14:00</tr>
                       <tr>15:00</tr>
                       <tr>16:00</tr>
                       <tr>17:00</tr>
                       <tr>18:00</tr>
                       <tr>19:00</tr>
                       <tr>20:00</tr>
                       <tr>21:00</tr>
                       <tr>22:00</tr>
                       <tr>23:00</tr>
                   </tbody>
               </table>
            </div>
        );
    }
    
}
