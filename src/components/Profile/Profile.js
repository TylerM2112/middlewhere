import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser, updateNotifications } from './../../ducks/reducer';
import friends from '../../assets/images/friends-512.png';
import Btn from '../Assets/Button/Btn';
import logo from "../../assets/images/mwLogoSmallpng.png";

import DisplayAddresses from '../DisplayAddresses/DisplayAddresses';
import DisplayNotifications from '../DisplayNotifications/DisplayNotifications';

import './Profile.css';
class Profile extends Component {
	constructor() {
		super();

		this.state = {
			notifications: [],
      		loaded:false,
      		setTimestamp:null
		}
	}

	componentDidMount() {
		this.setState({loaded:true,setTimestamp:new Date().getTime()})
    axios.get(`/api/getUserInfo/`)
    .then(res => {
      this.props.updateUser(res.data)
      
      axios.get(`/api/notifications/${this.props.state.user_id}`)
        .then(res => {
          this.setState({ notifications: res.data })
        })
      .catch(error => {
        console.log("notifications fetch error", error)
      })})
    .catch(err=>console.log(err));
	}

	displayProfile() {
		let html = ''
		if (this.props.state.name) {
			html =
				<div className="basicInfoContainer">
					<div className="picInfoContainer">
						<div >
							<img className="basicInfoPic" src={this.props.state.picture} alt="user" />
						</div>
						<div className="basicInfoText">
							<p>{this.props.state.name}</p>
							<p>{this.props.state.email}</p>
						</div>
					</div>
					<div>
						<button onClick={()=>this.props.switchView(1,1)}>Friends</button>
					</div>
				</div>
		}
		return html;
	}


	render() {
		return (
			<div className="ProfileMainContainer">

				{this.displayProfile()}
				{/* {this.displayNotifications()} */}
				{/* {this.displayLocations()} */}
				<DisplayNotifications notifications={this.state.notifications} />
				<DisplayAddresses />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		state: state,
	}
}

export default connect(mapStateToProps, { updateUser, updateNotifications })(Profile);