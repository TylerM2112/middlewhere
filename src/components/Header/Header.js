import React, {Component} from 'react';
import "./header.css"
import NewButton from '../Assets/Button/NewButton';

export default class Header extends Component {
  constructor(props){
    super(props)

    this.state = {
      pageTitle: '',
    }
  }

  componentDidMount(){
    if(this.props.TitleOfPage){

     let prop = this.props.TitleOfPage;
      this.setState({pageTitle: prop})
    } else {
      this.setState({pageTitle: "need props"})
    }

  }

  render() {
    return ( 
      <div className="header-parent-div">
        <h1 className="pageTitle">{this.state.pageTitle}</h1> 
        {this.props.NewButtonIsShown ? <NewButton buttonTxt={this.props.buttonName}/> : null}
      </div>
    )
  }
}