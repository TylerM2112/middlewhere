import React, { Component } from 'react';
import { excon } from 'excon'
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser, addAddress, removeAddress } from './../../ducks/reducer';
import profilepic from '../../assets/images/bestpicture.jpg';
import friends from '../../assets/images/friends-512.png';
import Btn from '../Assets/Button/Btn';

import './Profile.css';
class Profile extends Component {
	constructor() {
		super();

		this.state = {
			newAddress1: '',
			newCity: '',
			newState: '',
			newPostalcode: '',
			newPlaceName: '',
			toggleFriends: false,
			friendsNotification: 1,
			toggleGroups: false,
			groupsNotification: 0,
			toggleEvents: false,
			eventsNotification: 0,
			toggleLocations: false,
			toggleAddAddress: false,
			toggleAddress: false,
			toggleEditAddress: false,
			notifications: [],
		}

		this.displayProfile = this.displayProfile.bind(this);
		this.addAddress = this.addAddress.bind(this);
		this.toggle = this.toggle.bind(this);
		this.removeAddress = this.removeAddress.bind(this);
		this.submitAddress = this.submitAddress.bind(this);
		this.displayNotifications = this.displayNotifications.bind(this);
		this.displayLocations = this.displayLocations.bind(this);
		this.approved = this.approved.bind(this);
		this.removeNotification = this.removeNotification.bind(this);
	}

	componentDidMount() {
		axios.get('/api/getUserInfo/111')
			.then(res => {
				this.props.updateUser(res.data);
			})
			.catch(err => console.log(err));
		axios.get(`/api/notifications/50`).then(res => {
			this.setState({
				notifications: res.data
			})
		}).catch(error => {
			console.log("notifications fetch error", error)
		})
	}

	displayProfile() {
		let html = ''
		if (this.props.state.name) {
			html =
				<div className="basicInfoContainer">
					<div >
						<img className="basicInfoPic" src={this.props.state.picture} />
					</div>
					<div className="basicInfoText">
						<p>{this.props.state.name}</p>
						<p>{this.props.state.email}</p>
					</div>
				</div>
		}

		return html;
	}



	addAddress() {

		//Need to add checks to see if this is a real place
		let newAddress = encodeURI(`${this.state.newAddress1} ${this.state.newCity},${this.state.newState} ${this.state.newPostalcode}`)
		axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newAddress}`)
			.then(res => {
				let add = res.data.results[0].address_components;
				let lat = res.data.results[0].geometry.location.lat;
				let long = res.data.results[0].geometry.location.lng;
				let newAddress1 = add.find(e => e.types[0] === 'street_number').short_name;
				let newAddress2 = add.find(e => e.types[0] === 'route').short_name;
				
				var addressObj = {
					newAddress1: `${newAddress1} ${newAddress2}`,
					newCity: add.find(e => e.types[0] === 'locality').short_name,
					newState: add.find(e => e.types[0] === 'administrative_area_level_1').short_name,
					newPostalcode: add.find(e => e.types[0] === 'postal_code').short_name,
					newLat: lat,
					newLong: long,
					newPlaceName: this.state.newPlaceName,
					auto_id: this.state.auto_id,
				}
				if (this.state.auto_id) { 
					this.editAddress(addressObj)
				}
				else {
					this.addAddressToDatabase(addressObj)
				}	
			})
			.catch(err => console.log(err))

	}

	addAddressToDatabase(obj) {
		console.log(obj)
		axios.post(`/api/addUserAddress/${this.props.state.user_id}`, obj)
			.then(res => {
				console.log("BOOGERS", res.data[0].auto_id)
				obj.auto_id = res.data[0].auto_id;
				console.log("BOOGERS2", obj)
				this.props.addAddress(obj)

			})
			.catch(err => alert(err))
		this.toggle()
		this.setState({
			newAddress1: '',
			newCity: '',
			newState: '',
			newPostalcode: '',
			newPlaceName: '',
		})
	}

	toggle(str, e) {
		switch (str) {
			case "FRIENDS":
				this.setState({
					toggleFriends: !this.state.toggleFriends,
				})
				break;
			case "GROUPS":
				this.setState({
					toggleGroups: !this.state.toggleGroups,
				})
				break;
			case "EVENTS":
				this.setState({
					toggleEvents: !this.state.toggleEvents,
				})
				break;
			case "LOCATIONS":
				this.setState({
					toggleLocations: !this.state.toggleLocations,
				})
				break;
			case "ADDRESS_ADD":
				this.setState({
					// toggleAddAddress: !this.state.toggleAddAddress,
					newAddress1: '',
					newCity: '',
					newState: '',
					newPostalcode: '',
					newPlaceName: '',
					// toggleEditAddress: true,
				})
				if (this.state.toggleLocations & !this.state.toggleAddAddress) {
					this.setState({
						toggleAddAddress: true,
						toggleLocations: true,
					})
				} else if (!this.state.toggleLocations) {
					this.setState({
						toggleLocations: !this.state.toggleLocations,
					})
				}
				break;
			case "ADDRESS_CANCEL":
				this.setState({
					toggleAddAddress: !this.state.toggleLocations,
				})
				break;
			case "ADDRESS":
				this.setState({
					toggleAddress: !this.state.toggleAddress,
				})
				break;
			case "EDIT_ADDRESS":
				this.setState({
					// toggleEditAddress: !this.state.toggleEditAddress,
					newAddress1: e.address1,
					newCity: e.city,
					newPlaceName: e.place,
					newState: e.state,
					newPostalcode: e.postalcode,
					toggleAddAddress: true,
					auto_id: e.auto_id,
				})
				// if (this.state.toggleEditAddress) {
				// 	document.getElementById(e.auto_id).style.display = "inherit";
				// }
				// else { 
				// 	document.getElementById(e.auto_id).style.display = "none";
					// document.querySelectorAll("editAddressContainer").style.display = "none";
				}
				// break;

		// }
	}

	removeAddress(id) {
		axios.delete(`/api/removeAddress/${id}`).then(res => { }).catch(err => alert(err));
		this.props.removeAddress(id);
	}

	submitAddress() {
		if (this.state.newAddress1 !== null) {
			if (this.state.newCity !== null) {
				if (this.state.newState !== null) {
					if (this.state.newPostalcode !== null) {
						if (this.state.newPlaceName !== null) {
							this.addAddress();
							return;
						}
					}
				}
			}
		}
		alert('Please fill in all the fields.')
	}

	displayNotifications() {
		if (this.state.notifications.length !== 0) {
			console.log(this.state.notifications);
			return (

				< div className="notificationsContainer" >
					{this.state.notifications[0].length > 0 &&
						<div className="notification">

							<div className="notificationTab" onClick={() => this.toggle("FRIENDS")}>
								<div className="notificationLabel">
									<span>	New Friend Request! ({this.state.notifications[0].length}) </span>
								</div>
							</div>
							{this.state.notifications[0].map(e => {
								return (
									<div className={this.state.toggleFriends ? "requestContainer" : "friendsOff"}>
										<div className="requestPicContainer">
											<img src={e.picture} alt="profilepic" />
										</div>
										<div className="requestInfoContainer">
											<p>{e.name}</p>
											<button className="approveButton" onClick={() => this.approved(e)}>Approve</button>
											<button className="declineButton" onClick={() => this.removeNotification(e)}>Decline</button>
										</div>
									</div>
								)
							})}
						</div>
					}
					{this.state.notifications[1].length > 0 &&
						<div className="notification">

							<div className="notificationTab" onClick={() => this.toggle("GROUPS")}>
								<div className="notificationLabel">
									<span>	New Group Request! ({this.state.notifications[1].length}) </span>
								</div>
							</div>
							{this.state.notifications[1].map(e => {
								return (
									<div className={this.state.toggleGroups ? "requestContainer" : "groupsOff"}>
										<div className="requestPicContainer">
											<img src={e.picture} alt="profilepic" />
										</div>
										<div className="requestInfoContainer">
											<p>{e.notification_name}</p>
											<p>{e.purpose}</p>
											<button className="approveButton" onClick={() => this.approved(e)}>Approve</button>
											<button className="declineButton" onClick={() => this.removeNotification(e)}>Decline</button>
										</div>
									</div>
								)
							})}
						</div>
					}
					{this.state.notifications[2].length > 0 &&
						<div className="notification">

							<div className="notificationTab" onClick={() => this.toggle("EVENTS")}>
								<div className="notificationLabel">
									<span>	New Event Request! ({this.state.notifications[2].length}) </span>
								</div>
							</div>
							{this.state.notifications[2].map(e => {
								console.log("IM THE TYPE ID", e);
								return (
									<div className={this.state.toggleEvents ? "requestContainer" : "eventsOff"}>
										<div className="requestPicContainer">
											<img src={e.picture} alt="profilepic" />
										</div>
										<div className="requestInfoContainer">
											<p>{e.notification_name}</p>
											<p>On {e.event_date} at {e.event_time.substr(0, 2) < 12 ? `${e.event_time} AM` : e.event_time.substr(0, 2) - 12 + e.event_time.substr(2, 3) + "PM"}</p>
											<button className="approveButton" onClick={() => this.approved(e)}>Approve</button>
											<button className="declineButton" onClick={() => this.removeNotification(e)}>Decline</button>
										</div>
									</div>
								)
							})}
						</div>
					}
				</div >
			)
		}
	}

	displayAddresses() {
		let html = [];
		if (this.props.state.addresses.length !== 0) {
			this.props.state.addresses.map(e => {
				html.push(
					<div className="singleAddressTab" >
						<div className="singleAddressLabel" onClick={() => this.toggle("ADDRESS")}>
							<div>{e.place} - {e.address1}</div>
						</div>

						<div className={this.state.toggleAddress ? "singleAddressContainer" : "addressOff"}>
							<div>{e.city}, {e.state} {e.postalcode}</div>
							<div id={e.auto_id}className="editAddressContainer editAddressOff">

								<label>Location Label</label>
								<input type="text" onChange={e => this.setState({ newPlaceName: e.target.value })} value={this.state.newPlaceName} />
								<label>Address</label>
								<input type="text" onChange={e => this.setState({ newAddress1: e.target.value })} value={this.state.newAddress1} />
								<label>City</label>
								<input type="text" onChange={e => this.setState({ newCity: e.target.value })} value={this.state.newCity} />
								<label>State</label>
								<input type="text" onChange={e => this.setState({ newState: e.target.value })} value={this.state.newState} />
								<label>Zip Code</label>
								<input type="text" onChange={e => this.setState({ newPostalcode: e.target.value })} value={this.state.newPostalcode} />
								<button onClick={this.editAddress}>Submit</button>

							</div>
							<div className="addressButtonContainer">
								<button onClick={() => this.toggle("EDIT_ADDRESS", e)}>Edit</button>
								<button onClick={() => this.removeAddress(e.auto_id)}>Remove</button>
							</div>
						</div>
					</div>
				)
			})
		}

		return html;
	}

	displayLocations() {
		return (
			<div className="notification">

				<div className="locationTab">
					<div className="locationLabel" onClick={() => this.toggle("LOCATIONS")}>
						<p>Saved Locations</p>
					</div>
					<button onClick={() => this.toggle("ADDRESS_ADD")}>Add Address</button>
				</div>

				<div className={this.state.toggleLocations ? "addressesContainer" : "eventsOff"}>
					<div className={this.state.toggleAddAddress ? "editAddress" : "addAddressOff"}>
						<label>Location Label</label>
						<input type="text" onChange={e => this.setState({ newPlaceName: e.target.value })} value={this.state.newPlaceName} />
						<label>Address</label>
						<input type="text" onChange={e => this.setState({ newAddress1: e.target.value })} value={this.state.newAddress1} />
						<label>City</label>
						<input type="text" onChange={e => this.setState({ newCity: e.target.value })} value={this.state.newCity} />
						<label>State</label>
						<input type="text" onChange={e => this.setState({ newState: e.target.value })} value={this.state.newState} />
						<label>Zip Code</label>
						<input type="text" onChange={e => this.setState({ newPostalcode: e.target.value })} value={this.state.newPostalcode} />
						<button onClick={this.submitAddress}>Submit</button>
						<button onClick={() => this.toggle("ADDRESS_CANCEL")}>Cancel</button>
					</div>
					{this.displayAddresses()}
				</div>

			</div>
		)
	}

	approved(e) {
		switch (e.type) {
			case "friend":
				axios.post('/api/friends', e).then(res => {
				}).catch(err => {
					console.log("Issue with friend approving", err)
				})
				this.removeNotification(e);
				break;
			case "group":
				axios.post('/api/groups', e).then(res => {
				}).catch(err => {
					console.log("Issue with group approving", err)
				})
				this.removeNotification(e);
				break;
			case "event":
				axios.post('/api/events', e).then(res => {
				}).catch(err => {
					console.log("Issue with event approving", err)
				})
				this.removeNotification(e);
				break;
			default:
				return;
		}
	}

	removeNotification(e) {
		console.log(e)
		axios.delete(`/api/notifications/${e.notification_auto_id}`)
			.then(response => {
			})
			.catch(error => { console.log("Issue removing notification", error) });
		let index = null;
		let updatedNotifications = this.state.notifications.slice();
		switch (e.type) {
			case "friend":
				index = this.state.notifications[0].findIndex(i => i.notification_auto_id === e.notification_auto_id)
				updatedNotifications[0].splice(index, 1);
				break;
			case "group":
				index = this.state.notifications[1].findIndex(i => i.notification_auto_id === e.notification_auto_id)
				updatedNotifications[1].splice(index, 1);
				break;
			case "event":
				index = this.state.notifications[2].findIndex(i => i.notification_auto_id === e.notification_auto_id)
				updatedNotifications[2].splice(index, 1);
				break;
			default:
				return;
		}
		this.setState({
			notifications: updatedNotifications
		})
	}

	editAddress(obj) {
		axios.put(`/api/address/${obj.auto_id}`, obj)
			.then()
			.catch(err => { 
			console.log("Edit Address Put Error", err)
		})
	 }

	render() {
		return (
			<div className="ProfileMainContainer">
				{this.displayProfile()}
				<Btn label="FRIENDS" link="/friends" img={friends} />
				{this.displayNotifications()}
				{this.displayLocations()}

			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		state: state,
	}
}

export default connect(mapStateToProps, { updateUser, addAddress, removeAddress })(Profile);