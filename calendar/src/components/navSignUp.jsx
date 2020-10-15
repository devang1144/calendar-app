import React, { Component } from 'react'
import '../styles/NavSignup.scss';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export default class NavSignUp extends Component {
    render() {
        return (
            <div>
                <nav  className="navbar navbar-expand-lg p-4 navbar-signup">
                    <button className="navbar-toggler btn" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <motion className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/"><span className="nav-link-signup">Home</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login"><span className="nav-link-signup">Login</span></Link>
                        </li>
                        </ul>
                    </motion>
                    </nav>
            </div>
        )
    }
}
