import React, { Component } from 'react';
import {Link} from 'react-router-dom'
// import {excon} from 'excon'
export default class PostBttn extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log("this.props",this.props)
    }
    render() {
        return (
            
           <button onClick={this.props.postGroup} className={this.props.class}>
           {this.props.label}
           </button>
        

              
        );
    }
}