import React, { Component } from 'react';
import {Link} from 'react-router-dom'
// import {excon} from 'excon'
export default class PostBttn extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            //might have error with multiple props from a components having the same propname passed to them 
            //made for easy use of PostButton component
           <button className="PostBttn" onClick={this.props.postButtonFunctionProp} className={this.props.class}>
           {this.props.label}
           </button>
        

              
        );
    }
}