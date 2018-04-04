import React, { Component } from 'react';
import Header from '../Header/Header'
import NavBar from '../NavBar/NavBar'
import {connect} from 'react-redux'

class GroupsView extends Component {
    render() {
        return (
            <div>
                <Header TitleOfPage={"Groups"}/>

                <NavBar/>
            </div>
        );
    }
}

 const mapStateToProps = (state) => {
    return {
        state: state,
    }
}

export default connect(mapStateToProps)(GroupsView)