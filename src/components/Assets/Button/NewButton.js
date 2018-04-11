import React, { Component } from 'react';
import './buttons.css'

 const NewButton = (props) => {

    return (<button className={props.class} onClick={props.propsFunction}>{props.buttonTxt ? props.buttonTxt : "needs buttontxt"}</button>)
}

// onClick={() => props.propsFunction()}

export default NewButton;