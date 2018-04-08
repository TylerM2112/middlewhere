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
			newAddress1: null,
			newCity: null,
			newState: null,
			newPostalcode: null,
			newPlaceName: null,
			editToggle: false,
			toggleFriends: false,
			friendsNotification: 1,
			toggleGroups: false,
			groupsNotification: 1,
			toggleEvents: false,
			eventsNotification: 1,
			toggleLocations: false,
			toggleAddAddress: false,
			toggleAddress: false,
		}

		this.displayProfile = this.displayProfile.bind(this);
		this.addAddress = this.addAddress.bind(this);
		this.toggle = this.toggle.bind(this);
		this.removeAddress = this.removeAddress.bind(this);
		this.submitAddress = this.submitAddress.bind(this);
		this.displayNotifications = this.displayNotifications.bind(this);
		this.displayLocations = this.displayLocations.bind(this);
	}

	componentDidMount() {
		axios.get('/api/getUserInfo/111')
			.then(res => {
				console.log(res.data);
				this.props.updateUser(res.data);
			})
			.catch(err => console.log(err));
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
				console.log(res.data.results[0])
				let add = res.data.results[0].address_components;
				let lat = res.data.results[0].geometry.location.lat;
				let long = res.data.results[0].geometry.location.lng;
				console.log(add)
				var addressObj = {
					newAddress1: `${add[0].short_name} ${add[1].short_name}`,
					newCity: add[3].short_name,
					newState: add[5].short_name,
					newPostalcode: +add[7].short_name,
					newLat: lat,
					newLong: long,
					newPlaceName: this.state.newPlaceName,
				}
				this.addAddressToDatabase(addressObj)

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

		this.setState({
			newAddress1: null,
			newCity: null,
			newState: null,
			newPostalcode: null,
			newPlaceName: null,
			editToggle: false,
		})
		this.toggle()
	}

	toggle(str) {
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
			case "ADDRESS_EDIT":
				this.setState({
					toggleAddAddress: !this.state.toggleAddAddress,
				})
				if (this.state.toggleLocations) {
					this.setState({
						toggleLocations: true,
					})
				} else {
					this.setState({
						toggleLocations: false,
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
		}
	}

	removeAddress(id) {
		axios.delete(`/api/removeAddress/${id}`).then(res => {
			alert("yay")
		}).catch(err => alert(err));
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
		return (

			< div className="notificationsContainer" >
				{this.state.friendsNotification > 0 &&
					<div className="notification">

						<div className="notificationTab" onClick={() => this.toggle("FRIENDS")}>
							<div className="notificationLabel">
								New Friend Request!
              </div>
						</div>

						<div className={this.state.toggleFriends ? "requestContainer" : "friendsOff"}>
							<div className="requestPicContainer">
								<img src={profilepic} alt="profilepic" />
							</div>
							<div className="requestInfoContainer">
								<p>breadManGaming</p>
								<button className="approveButton">Approve</button>
								<button className="declineButton">Decline</button>
							</div>
						</div>

					</div>
				}
				{this.state.groupsNotification > 0 &&
					<div className="notification">

						<div className="notificationTab" onClick={() => this.toggle("GROUPS")}>
							<div className="notificationLabel">
								New Group Request!
              </div>
						</div>

						<div className={this.state.toggleGroups ? "requestContainer" : "groupsOff"}>
							<div className="requestPicContainer">
								<img src={profilepic} alt="profilepic" />
							</div>
							<div className="requestInfoContainer">
								<p>breadManGaming</p>
								<p>Pool Party Saturdays</p>
								<button className="approveButton">Approve</button>
								<button className="declineButton">Decline</button>
							</div>
						</div>

					</div>
				}
				{this.state.eventsNotification > 0 &&
					<div className="notification">

						<div className="notificationTab" onClick={() => this.toggle("EVENTS")}>
							<div className="notificationLabel">
								New Event Request!
              </div>
						</div>

						<div className={this.state.toggleEvents ? "requestContainer" : "eventsOff"}>
							<div className="requestPicContainer">
								<img src={profilepic} alt="profilepic" />
							</div>
							<div className="requestInfoContainer">
								<p>breadManGaming Game Night</p>
								<p>On 4/20/2018 at 5:00PM</p>
								<button className="approveButton">Accept</button>
								<button className="declineButton">Decline</button>
							</div>
						</div>

					</div>
				}
			</div >
		)
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
							<div className="addressButtonContainer">
								<button >Set Default</button>
								<button >Edit</button>
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
					<button onClick={() => this.toggle("ADDRESS_EDIT")}>Add Address</button>
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