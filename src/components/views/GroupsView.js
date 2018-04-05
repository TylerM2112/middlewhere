import React, { Component } from 'react';
import Header from '../Header/Header'
import NewGroup from '../NewGroup/NewGroup';
import {connect} from 'react-redux'
import './groupsview.css'

class GroupsView extends Component {
    constructor(props){
        super(props)

        this.state = {
            optionDiv:"primary",
            friends:[1,2,3,4,5,6,7,8,9,99],
        }
    }

    

    render() {
        const displayFriendsOptions = this.state.friends.map((elem,i) => {
            return(
              <input type="checkbox" value={elem}/>
            )
          })
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