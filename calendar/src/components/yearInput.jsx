import React from 'react';
import Func from './calendar_functions';

const YearInput = (props) => {
    
    return (
        <input
            defaultValue = {this.props.year}
            className="form-control year-value"
            ref={(yearInput) => { this.yearInput = yearInput}}
            onKeyUp= {(e) => this.onKeyUpYear(e)}
            onChange = {(e) => this.onYearChange(e)}
            type="number"
            placeholder="year"/>
    );
}

export default YearInput;