import React, { Component } from 'react';
import './buttons.css'
 const NewButton = (props) => {
    console.log(props)
    return (<button className="newButton" onClick={props.propsFunction}>{props.buttonTxt ? props.buttonTxt : "needs buttontxt"}</button>)
}

// onClick={() => props.propsFunction()}

export default NewButton;