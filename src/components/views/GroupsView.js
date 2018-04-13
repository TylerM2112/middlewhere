import React, { Component } from 'react';
import Header from '../Header/Header'
import NewGroup from '../NewGroup/NewGroup';
import GroupEvent from '../GroupEvent/GroupEvent'
import Groups from '../Groups/Groups';
import {connect} from 'react-redux'
import './groupsview.css'
import {Route,Switch} from 'react-router-dom'

class GroupsView extends Component {
    constructor(props){
        super(props)

        this.state = {
            optionDiv:"primary",
            friends:[1,2,3,4,5,6,7,8,9,99],
        }
    }

    

    render() {
        return (
            <div>
                {/* <Header TitleOfPage={"Groups"}/> */}
               <Route exact path='/groups' component={Groups}/>
               <Route exact path='/groups/new/' component={NewGroup}/>
                {/* <Groups/> */}
                {/* <NewGroup/> */}
                {/* <GroupEvent/> */}
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