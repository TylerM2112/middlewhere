import React, { Component } from 'react';
import './buttons.css'
 const NewButton = (props) => {
    return (<button className="newButton" >{props.buttonTxt ? props.buttonTxt : "needs buttontxt"}</button>)
}

// onClick={() => props.propsFunction()}

export default NewButton;