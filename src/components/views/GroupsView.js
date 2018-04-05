import React, { Component } from 'react';
import Header from '../Header/Header'
import NewGroup from '../NewGroup/NewGroup';
import {connect} from 'react-redux'


class GroupsView extends Component {
    render() {
        return (
            <div>
                <Header TitleOfPage={"Groups"}/>
                <NewGroup/>
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