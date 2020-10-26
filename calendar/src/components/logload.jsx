import React,{Component} from 'react';
import Calendar from './calender'; 
import Cookies from 'js-cookie';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
export default class Loading extends Component{


    state = {
        user: [],
        error: false,
        temp: "hello",
        loading: true
    }

    
    componentDidMount = async() => {
        const { data:user } = await axios.get('/api/user/login');
            this.setState({ user, loading:false })
            
    }
    render(){

        let element = <div className="container d-flex justify-content-center align-items-center vh-100">
        <div class="spinner-border text-dark m-2 mb-4" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <p style={{fontSize:"50px"}}>Loading...</p>
    </div>;

        if(!this.state.loading){
            element = <Redirect to='/d' />
        }
        
        return( 
            <div className="container">
                {element}
            </div>
        )

    }
}