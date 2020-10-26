import React, { Component } from 'react'
import Popover from '@material-ui/core/Popover';
export default class Test extends Component {

    render() {
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
            <div class="spinner-border text-dark m-2 mb-4" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <p style={{fontSize:"50px"}}>Loading...</p>
        </div>
        )
    }
}

//846399072508-1aj3ttvbsjduqn7kl1pjjbvge2cdmtkb.apps.googleusercontent.com