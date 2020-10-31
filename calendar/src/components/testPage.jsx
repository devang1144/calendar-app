import React, { Component } from 'react'
import '../styles/test.scss';
export default class Test extends Component {
    state = {
        isOpen:false
    }
    toggle = () => {
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    render() {
        return (
            <div className="vh-100">
            {/* <div class="spinner-border text-dark m-2 mb-4" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <p style={{fontSize:"50px"}}>Loading...</p> */}
            <div className="sidenav">
            <i onClick={this.toggle} className="fa fa-times"></i>
            {this.state.isOpen && <ul class="list-group">
                <li class="list-group-item">l1</li>
                <li class="list-group-item">l2</li>
                <li class="list-group-item">l3</li>
                <li class="list-group-item">l4</li>
                <li class="list-group-item">l5</li>
                  
            </ul>}
             
            </div>
        </div>
        )
    }
}

// //846399072508-1aj3ttvbsjduqn7kl1pjjbvge2cdmtkb.apps.googleusercontent.com
