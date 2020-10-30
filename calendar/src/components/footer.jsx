import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class Footer extends Component {
    render() {
        return (
            <footer className="footer p-2 border-top mt-5">
                <div className="row">
                    <div className="col-md-4"><h2 className="is-fjalla mt-5">1999 Sharp</h2><h6>Your schedule<br/>management tool</h6></div>
                    <div className="col-md-1"><h4 className="is-fjalla mt-5">Links</h4>
                    <h6><Link to="/signup">Sign up</Link></h6>
                    <h6><Link to="/login">Sign in</Link></h6>
                    </div>
                    <div className="col-md-1"><h4 className="is-fjalla mt-5">Product</h4>
                    <h6><Link to="/">Overview</Link></h6>
                    </div>
                    <div className="col-md-1"><h4 className="is-fjalla mt-5">Contact us</h4>
                    <h6><a href="mailto:acw.dnsp@gmail.com">Email us</a></h6>
                    </div>
                    <div className="col-md-5"></div>
                </div>
            </footer>
        )
    }
}
