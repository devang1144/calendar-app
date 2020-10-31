// import React, { Component } from 'react'
import '../styles/test.scss';
// export default class Test extends Component {
//     state = {
//         isOpen:false
//     }
//     toggle = () => {
//         this.setState({
//             isOpen:!this.state.isOpen
//         })
//     }
//     render() {
//         return (
//             <div className="vh-100">
//             {/* <div class="spinner-border text-dark m-2 mb-4" role="status">
//                 <span class="sr-only">Loading...</span>
//             </div>
//             <p style={{fontSize:"50px"}}>Loading...</p> */}
//             <div className="sidenav">
//             <i onClick={this.toggle} className="fa fa-times"></i>
//             {this.state.isOpen && <ul class="list-group">
//                 <li class="list-group-item">l1</li>
//                 <li class="list-group-item">l2</li>
//                 <li class="list-group-item">l3</li>
//                 <li class="list-group-item">l4</li>
//                 <li class="list-group-item">l5</li>
                  
//             </ul>}
             
//             </div>
//         </div>
//         )
//     }
// }

// // //846399072508-1aj3ttvbsjduqn7kl1pjjbvge2cdmtkb.apps.googleusercontent.com
import React, { Component } from 'react'
import Popover from '@material-ui/core/Popover';
import '../styles/nav.scss'
export default class Test extends Component {
    state={
        type:"password",
        type2:"password"
    }
    showpassword =()=>{
        this.setState({
            type: this.state.type === 'input' ? 'password':'input'
        })
    }
    showcnfp=()=>{
        this.setState({
            type2:this.state.type2 === 'input' ? 'password':'input'
        })
    }

    render() {
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={e => this.handleSubmit(e)}>
                <label htmlFor="New Password" className="mt-3">Enter New Password</label>
                <div className="search">
                    <span class="fa fa-eye show-icon" aria-hidden="true" onClick={this.showpassword}></span>
                    <input type={this.state.type} name='New Password'  id='pass1' className="" onChange={this.handleChange}/>
                </div>
                <label htmlFor="New Password" className="mt-3">Confirm Password</label>
                <div className="enter">
                <i class="fa fa-eye show-icon" aria-hidden="true" onClick={this.showcnfp}></i>
                <input type={this.state.type2} name='Confirm Password'  id='pass2' className="" onChange={this.handleChange}/></div>
                {alert}
                <button  className="mt-3 add-signup-btn">Change password</button>
            </form>
        </div>
        )
    }
}

//846399072508-1aj3ttvbsjduqn7kl1pjjbvge2cdmtkb.apps.googleusercontent.com