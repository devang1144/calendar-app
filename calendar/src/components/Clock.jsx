import React, {Component} from "react";
import '../style/page.css';
class Clock extends Component{
  
    state = {
        date: new Date()
    }

    updateTime() {
        setInterval(() => {
            this.setState({date: new Date()});
        }, 1000);
    }
    render() {
        return (
        <div className="m-0">
            <h2 className="is-white mb-0">
                {this.state.date.toLocaleTimeString()}
            </h2>
            {this.updateTime()}
        </div>
        );
    }
}
export default Clock;
