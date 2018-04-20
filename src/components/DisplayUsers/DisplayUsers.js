import React, {Component} from 'react';
import axios from 'axios';
import PostButton from '../Assets/Button/PostButton';
// import NewButton from '../Assets/Button/NewButton';
import './displayUsers.css';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer.js';
import ReactSwipe from 'react-swipe';

class DisplayUsers extends Component {
    constructor(props){
        super(props)

        this.state = {
            input: '',
            confirmationMessage:'',
        }
        this.addToFriendsFunc = this.addToFriendsFunc.bind(this)
        this.compare = this.compare.bind(this)
        this.displayUsers = this.displayUsers.bind(this)
    }


    componentDidMount() {
        this.setState({friends:this.props.friends,users:this.props.users})
    }

    componentWillReceiveProps(props){
        this.setState({friends:props.friends,users:props.users})
    }



    addToFriendsFunc(id, index) {
        console.log(this.props.users)
        this.props.users.splice(index, 1)
        axios.post(`/api/friends/${id}`, {receiver: id, sender: this.props.state.user_id, type: 'friend'})
        .then((resp) => {
            this.setState({
                // confirmationMessage: "request has been sent to " + this.props.users[index].name,
            })
        })
        .catch((err) => {
            console.log('err', err)
        })
    }


    compare(){
        if(this.state.friends && this.state.users){
            let filtered = []

            this.state.users.map(f=> this.state.friends.findIndex(e=>e.friend_id == f.auto_id) == -1 ? filtered.push(f) : '')

           this.setState({filtered:filtered})
        }

    }

    displayUsers(){
        if(this.state.friends && this.state.users){
            let filtered = []

            this.state.users.map(f=> this.state.friends.findIndex(e=>e.friend_id == f.auto_id) == -1 ? filtered.push(f) : '')

           return  filtered.map((elem, i) => {
                let timer = i;
               let   style = { animationDelay: `${timer/20}s` }
                 return (
                     // <ReactSwipe className="carousel" swipeOptions={{ continuous: false }} key={elem.auto_id + i} id={"id" + elem.auto_id}>
                     <div style={style} className="individual_user_div">
                     <div className="">
                         <div className="user_name"> {elem.name}</div>
                         <img className="user_img" src={elem.picture}/>
                         <PostButton  postButtonFunctionProp={() => {this.addToFriendsFunc(elem.auto_id, i)}} label={'ADD TO FRIENDS'} class={"addToFriendsButton"}/>
                     </div>
                     </div>
                     //  </ReactSwipe>
                 )   
             })
        }
    }

    
    render(){

        return(

            <div className={this.props.displayUserDiv}>
            <div className="scrollableContainer">    
                    <div>{this.displayUsers()}</div>
             </div>       

            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        state:state
    }
}

export default connect(mapStateToProps)(DisplayUsers);