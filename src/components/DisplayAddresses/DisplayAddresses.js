import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addAddress, removeAddress, updateAddress, updateAllAddresses, forceDefault } from './../../ducks/reducer';

import logo from "../../assets/images/mwLogoSmallpng.png";


class DisplayAddresses extends Component {
  constructor() { 
    super()
    this.state = {
			newAddress1: '',
			newCity: '',
			newState: '',
			newPostalcode: '',
			newPlaceName: '',
			toggleLocations: false,
			toggleAddAddress: false,
			toggleAddress: false,
    }
    this.addAddress = this.addAddress.bind(this);
		this.toggle = this.toggle.bind(this);
		this.removeAddress = this.removeAddress.bind(this);
		this.submitAddress = this.submitAddress.bind(this);
    this.displayLocations = this.displayLocations.bind(this);
		this.setAsDefault = this.setAsDefault.bind(this);

  }

  // FUNCTIONALITY FOR ADD ADDRESS BUTTON, CHECKS IF ITS A NEW OR CURRENT ADDRESS AND ACTS ACCORDINGLY.
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
					defaultaddress: this.props.state.address_count === 0 ? true : this.state.defaultaddress,
				}
				if (this.state.auto_id) {
					this.editAddress(addressObj)
					this.toggle("ADDRESS_CLOSE");
					this.setState({
						auto_id: null,
					});
				}
				else {
					this.addAddressToDatabase(addressObj)
					this.toggle("ADDRESS_CLOSE");
				}
			})
			.catch(err => {
				alert("Please review and re-enter your address.")
				console.log("Google Geocode Error", err)
			})

	}

  // ADDS ADDRESS TO DATABASE FOR CURRENT USER
	addAddressToDatabase(obj) {
		axios.post(`/api/addUserAddress/${this.props.state.user_id}`, obj)
			.then(res => {
				obj.auto_id = res.data[0].auto_id;
				this.props.addAddress(obj);
			})
			.catch(err => alert(err))
		this.setState({
			newAddress1: '',
			newCity: '',
			newState: '',
			newPostalcode: '',
			newPlaceName: '',
		})
	}

    //EDITS ADDRESS
  editAddress(obj) {
		axios.put(`/api/address/${obj.auto_id}`, obj)
			.then(res => {
				this.props.updateAddress(res.data[0]);
				axios.put(`/api/address`, res.data[0])
					.then(response => {
					})
					.catch(err => {
						console.log("Update Default error", err)
					})
			})
			.catch(err => {
				console.log("Edit Address Put Error", err)
			})
  }
  
  submitAddress() {
		
    this.addAddress();
    return;

alert('Please make sure all the fields are filled in.')
}

  //REMOVES ADDRESS
  removeAddress(id) {
    axios.delete(`/api/removeAddress/${id}`)
      .then()
      .catch(err => console.log("DisplayAddresses.removeAddress", err));
		this.props.removeAddress(id);
  }
  
  //SETS SELECTED ADDRESS AS DEFAULT LOCATION
  setAsDefault(e) {
		axios.put(`/api/address/default/${this.props.state.user_id}`, e)
					.then(response => {
						this.props.updateAllAddresses(response);
					})
					.catch(err => {
						console.log("DisplayAddresses.setAsDefault", err)
					})
  }
  
  toggle(str, e) {
    switch (str) {
      case "LOCATIONS":
				this.setState({
					toggleLocations: !this.state.toggleLocations,
				})
				break;
			case "ADDRESS_ADD":
				this.setState({
					newAddress1: '',
					newCity: '',
					newState: '',
					newPostalcode: '',
					newPlaceName: '',
					auto_id: null,
				})
				if (this.state.toggleLocations & !this.state.toggleAddAddress) {
					this.setState({
						toggleAddAddress: true,
					})
				} else if (!this.state.toggleLocations && !this.state.toggleAddAddress) {
					this.setState({
						toggleLocations: true,
						toggleAddAddress: true,
					})
				}
				break;
			case "ADDRESS_CANCEL":
				this.setState({
					newAddress1: '',
					newCity: '',
					newState: '',
					newPostalcode: '',
					newPlaceName: '',
					toggleAddAddress: !this.state.toggleLocations,
				})
				break;
			case "ADDRESS":
				this.setState({
					toggleAddress: !this.state.toggleAddress,
				})
				break;
			case "ADDRESS_CLOSE":
				this.setState({
					newAddress1: '',
					newCity: '',
					newState: '',
					newPostalcode: '',
					newPlaceName: '',
					toggleAddAddress: !this.state.toggleAddAddress,
				})
				break;
			case "EDIT_ADDRESS":
				this.setState({
					newAddress1: e.address1,
					newCity: e.city,
					newPlaceName: e.place,
					newState: e.state,
					newPostalcode: e.postalcode,
					toggleAddAddress: true,
					auto_id: e.auto_id,
				})
				break;
			default:
				break;
		}
	}

  // THIS IS THE SAVED LOCATIONS BAR ON PROFILE PAGE
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
						<div className="editAddressButtonContainer">
							<button onClick={this.submitAddress}>Submit</button>
							<button onClick={() => this.toggle("ADDRESS_CANCEL")}>Cancel</button>
						</div>
          </div>
          
					{this.props.state.address_count === 0 ? <div><h1>Please add an address</h1></div> : this.displayAddresses()}
				</div>
			</div>
		)
  }
  

  //THIS DISPLAYS EACH ADDRESS BAR UNDER SAVED LOCATIONS BAR ON PROFILE PAGE
  displayAddresses() {
		let html = [];

		if (this.props.state.addresses.length !== 0) {
			let index = this.props.state.addresses.findIndex(e => e.defaultaddress === true)
			if (index === -1) {
				this.props.forceDefault();
			}
			this.props.state.addresses.map(e => {
        html.push(
          
					<div className="singleAddressTab" >
						<div className="singleAddressLabel" onClick={() => this.toggle("ADDRESS")}>
              <div className="addressLabelText">{e.place} - {e.address1}</div>

              {e.defaultaddress == true ?
                  <div><img src={logo} alt="logo" /></div>
                :
                  <div></div>}
						</div>

						<div className={this.state.toggleAddress ? "singleAddressContainer" : "addressOff"}>
							<div>{e.city}, {e.state} {e.postalcode}</div>
							<div className="addressButtonContainer">
								<button onClick={() => this.toggle("EDIT_ADDRESS", e)}>Edit</button>
								<button onClick={() => this.removeAddress(e.auto_id)}>Remove</button>
								<button onClick={() => this.setAsDefault(e)}>Set as Default</button>
							</div>
            </div>
            
					</div>
				)
				return html;
			})
		}
		return html;
  }
  




  render() {
    return (
      <div>
      {this.props.state.user_id ?   
        this.displayLocations()
      :
        '' } 
      </div>  
    );
  }
}

const mapStateToProps = state => {
	return {
		state: state,
	}
}

export default connect(mapStateToProps, { addAddress, removeAddress, updateAddress, updateAllAddresses, forceDefault })(DisplayAddresses);