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
    }
    addToFriendsFunc(id, index){   
        this.props.users.splice(index, 1)
        axios.post(`/api/friends/${id}`, {receiver: id, sender: this.props.state.user_id, type: 'friend'})
        .then((resp) => {
            this.setState({
                confirmationMessage: "request has been sent to " + this.props.users[index].name,
            })
        })
        .catch((err) => {
            console.log('err', err)
        })
    }

    
    
    render(){
        let filteredUsers = this.props.users.filter((user) => {
            return  user.name.indexOf(this.state.input) !== -1;
        })
        console.log('this.state', this.state)
        const displayUsers = this.props.users.map((elem, i) => {
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


        // window.onscroll = function() {myFunction()};

        //     var searchbar = document.getElementsByClassName("friend_Search");
        //     var sticky = searchbar.offsetTop;

        //     function myFunction() {
        //     if (window.pageYOffset >= sticky) {
        //     searchbar.classList.add("sticky")
        //         } else {
        //         searchbar.classList.remove("sticky");
        //     }
        // }

        return(

            <div className={this.props.displayUserDiv}>
            <div className="scrollableContainer">    
                    <div>{displayUsers}</div>
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