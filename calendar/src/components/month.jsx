import React, { Component } from 'react'
import axios from 'axios';
export default class Lists extends Component {
    state = {
        events:[]
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
    }
    
    render() {
        return (
            <div>
                <h1 className="is-white is-poppins mt-4 ml-2">My Dashboard</h1>
                <ul className="list-group">
                    {this.state.events.map(e => 
                        <li className="list-group-item">
                            {e.todo}
                        </li>  
                        )}
                </ul>
            </div>
        )
    }
}
