import React, { Component } from 'react';
import {Link} from 'react-router-dom'
// import {excon} from 'excon'
export default class Btn extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log("this.props",this.props)
    }
    render() {
        return (
            <Link to={this.props.link}>
           <div className="nav_Link_Li">
           <img src={this.props.img}/>
           <h5>{this.props.label}</h5>
           </div>
           </Link>

              
        );
    }
}