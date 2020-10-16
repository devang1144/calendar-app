import React, { Component } from 'react'
import axios from 'axios';
import { motion } from 'framer-motion';
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
                <h1 className="is-white is-poppins mt-4 ml-2 m-5">My Dashboard</h1>
                <div className="row">
                    <div className="col-md-5 p-5">
                        <h3 className="is-white is-poppins pb-2 pl-2">Scheduled Events</h3>
                        <motion.ul className="p-0" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:1}}>
                            {this.state.events.map(e => 
                                    <li className="p-3 is-poppins is-white"><strong>{e.todo}</strong></li>
                                )}
                        </motion.ul>
                        
                    </div>
                    <div className="col d-flex justify-content-end">
                        <h4 className="is-white p-4">add event<i className="fa fa-plus p-2" style={{color:"#89C283"}}></i></h4>
                    </div>
                </div>
                       
            </div>
        )
    }
}
