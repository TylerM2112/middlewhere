import React, { Component } from 'react';
import './buttons.css'
 const DeleteButton = (props) => {
    console.log(props)
    return (<button className="DeleteButton" onClick={props.propsFunction}>{props.buttonTxt ? props.buttonTxt : "needs buttontxt"}</button>)
}

// onClick={() => props.propsFunction()}

export default DeleteButton;