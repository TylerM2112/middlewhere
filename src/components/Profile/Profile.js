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
		}
	}

	componentDidMount() {
		console.log(this.props.state)
		axios.get(`/api/getUserInfo/`)
		//gets userId from reducer state
			.then(res => {
				if (res.data.address_count) {
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
				} else {
				this.props.updateUser(res.data);
				}
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
					</div>
					<div>
						<Btn label="FRIENDS" link="/friends" img={friends} />
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