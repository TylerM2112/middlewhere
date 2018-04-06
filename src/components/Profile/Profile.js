import React, { Component } from 'react';
import { excon } from 'excon'
import { connect } from 'react-redux';
import axios from 'axios';
import { updateUser } from './../../ducks/reducer';

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
        }

        this.displayProfile = this.displayProfile.bind(this);
        this.addAddress = this.addAddress.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        axios.get('/api/getUserInfo/191')
            .then(res => {

                this.props.updateUser(res.data);
            })
            .catch(err => console.log(err));
    }

    displayProfile() {
        let html = ''
        if (this.props.state.name) {
            html =
                <div className="basicInfoContainer">
                    <img src={this.props.state.picture} />
                    <p>{this.props.state.name}</p>
                    <p>{this.props.state.email}</p>
                </div>
        }

        return html;
    }

    displayAddresses() {
        let html = [];
        if (this.props.state.addresses.length !== 0) {
            this.props.state.addresses.map(e => {
                html.push(<div className="addressContainer">
                    <p>{e.place}</p>    
                    <p>{e.address1}</p>
                    <p>{e.city}, {e.state} {e.postalcode}</p>
                    <button>Remove</button>
                </div>)
            })
        }

        return html;
    }

    addAddress() {

        //Need to add checks to see if this is a real place
        let newAddress = encodeURI(`${this.state.newAddress1} ${this.state.newCity},${this.state.newState} ${this.state.newPostalcode}`)
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newAddress}`)
            .then(res => {
                this.toggle(),
                console.log(res.data.results[0])
                let add = res.data.results[0].address_components;
                let lat = res.data.results[0].geometry.location.lat
                let long = res.data.results[0].geometry.location.lng
                console.log(add)
                this.setState({
                    newAddress1: `${add[0].short_name} ${add[1].short_name}`,
                    newCity: add[3].short_name,
                    newState: add[5].short_name,
                    newPostalcode: +add[6].short_name,
                    newLat: lat,
                    newLong: long,
                }, () => this.addAddressToDatabase())
            })
            .catch(err => console.log(err))
            this.props.updateUser(this.state);
    }

    addAddressToDatabase() {
        axios.post(`/api/addUserAddress/${this.props.state.user_id}`, this.state)
            .then(res => alert("yay"))
            .catch(err => alert(err))
    }

    toggle() {
        this.setState({
            editToggle: !this.state.editToggle,
        })
    }

    render() {
        return (
            <div className="ProfileMainContainer">
                {this.displayProfile()}
                <div>Addresses
             {this.displayAddresses()}
                </div>
                <button onClick={this.toggle}>Add Address</button>
                <div className={this.state.editToggle ? "toggleOn editAddress" : "toggleOff"}>
                    <label>Location Label</label>
                    <input onChange={e => this.setState({ newPlaceName: e.target.value })} />
                    <label>Address</label>
                    <input onChange={e => this.setState({ newAddress1: e.target.value })} />
                    <label>City</label>
                    <input onChange={e => this.setState({ newCity: e.target.value })} />
                    <label>State</label>
                    <input onChange={e => this.setState({ newState: e.target.value })} />
                    <label>ZipCode</label>
                    <input onChange={e => this.setState({ newPostalcode: e.target.value })} />
                    <button onClick={e => this.addAddress()}>Submit</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state: state,
    }
}

export default connect(mapStateToProps, { updateUser })(Profile);