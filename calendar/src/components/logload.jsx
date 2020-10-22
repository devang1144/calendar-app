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

        let element = <div>
            <i class="fa fa-spinner" aria-hidden="true"></i>
            <p style={{fontSize:"20px"}}>loading</p>
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