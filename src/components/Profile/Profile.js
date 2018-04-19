import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser, updateNotifications, logoutUser } from './../../ducks/reducer';
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
		}
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		console.log(this.props.state)
		axios.get(`/api/getUserInfo/`)
		//gets userId from reducer state
			.then(res => {
				console.log(res.data)
				//if there is and address_count
					this.props.updateUser(res.data)
					axios.get(`/api/notifications/${this.props.state.user_id}`).then(res => {
			console.log(this.props.state.user_id);
			this.setState({
				notifications: res.data
			})
			// this.props.updateNotifications(res.data);
		}).catch(error => {
			console.log("notifications fetch error", error)
		})
			})
			.catch(err => console.log(err));
		console.log(`/api/notifications/${this.props.state.user_id}`)
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
					<button onClick={this.logout}>Log out</button>
					</div>
					<div>
						<Btn label="FRIENDS" link="/friends" img={friends} />
					</div>
				</div>
		}
		return html;
	}

	logout() {
		axios.post('/api/logout')
			.then(
				this.props.logoutUser(),
				window.location.replace('/')
			)
			.catch(err => console.log("Profile Logout Error", err));
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

export default connect(mapStateToProps, { updateUser, updateNotifications, logoutUser })(Profile);