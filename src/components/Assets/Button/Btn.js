import React, { Component } from 'react';
import {Link} from 'react-router-dom'
export default class Btn extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Link to={this.props.link}>
           <div className="nav_Link_Li">
            {this.props.img ? <img src={this.props.img}/> : ''}
           <h5>{this.props.label}</h5>
           </div>
           </Link>

              
        );
    }
}