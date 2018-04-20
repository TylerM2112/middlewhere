import React, { Component } from 'react';
import axios from 'axios';
import './Friends.css';
import NewButton from '../Assets/Button/NewButton';
import DeleteButton from '../Assets/Button/DeleteButton'
import {connect} from 'react-redux'


class Friends extends Component {
    constructor(props){
        super(props)

        this.state = {
            friends: [],
            load:false
        }

        this.displayFriends = this.displayFriends.bind(this)
    }
    componentDidMount(){
        // axios.get('/api/friends')
        // .then((resp) => {
        //     console.log('resp.data', resp.data);
        //     this.setState({
        //         friends: resp.data
        //     })
        // })
        // .catch((err) => {
        //     console.log('err', err)
        // })
    }

    componentWillReceiveProps(props) {
        if(props.view === 1 && props.subView === 1 && this.state.friends.length === 0){
            if(this.props.state.user_id){
                axios.get(`/api/friends/${this.props.state.user_id}`)
                .then((resp) => {
                    console.log('resp.data', resp.data);
                    this.setState({
                        friends: resp.data,
                        load:true
                    })
                })
                .catch((err) => {
                    console.log('err', err)
                })
            }
        }
        else{
            if(this.state.load){
                this.setState({load:false})
            }
        }
    }

    displayFriends(){
        let html = []
        if(this.state.friends){
            console.log("FRIENDS",this.state.friends)
            this.state.friends.map((elem) => {
                html.push(<div>
                    <div>{elem.name}</div>
                    <div>{elem.email}</div>
                    <div>{elem.phone}</div>
                    <div><img src={elem.picture}/></div>
                    <DeleteButton propsFunction={() => this.deleteFriends(elem.auto_id)} buttonTxt={'delete friend'}/>
                </div>)
        })
    }

    return html;
}
    
    render() {
    

   
        return (
            <div className="display_friends_parent">
            {this.state.load ?
                <div>
                {this.displayFriends()}
                </div>
            :
            ''}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        state:state,
    }
}
export default connect(mapStateToProps)(Friends)
