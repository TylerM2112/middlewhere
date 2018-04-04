import React, { Component } from 'react';
import {excon} from 'excon'
import {connect} from 'react-redux';
import axios from 'axios';
import {updateUser} from './../../ducks/reducer';

class Profile extends Component {
    constructor(){
        super();

        this.state={
            newAddress1:null,
            newCity:null,
            newState:null,
            newPostalcode:null,
            newPlaceName:null,
        }

        this.displayProfile = this.displayProfile.bind(this);
        this.addAddress = this.addAddress.bind(this)
    }

    componentDidMount() {
        axios.get('/api/getUserInfo/10')
            .then(res=>{
            
                this.props.updateUser(res.data);
            })
            .catch(err=>console.log(err));
        }

    displayProfile(){
        let html = ''
        if(this.props.state.name){
            html = 
                <div>
                    <img src={this.props.state.picture}/>
                    <p>{this.props.state.name}</p>
                    <p>{this.props.state.email}</p>
                </div>
        }

        return html;
    }

    displayAddresses(){
        let html = [];
        if(this.props.state.addresses.length !== 0){
           this.props.state.addresses.map(e=>{
               html.push(<div>
                        <p>{e.address1}</p>
                        <p>{e.city}, {e.state} {e.postalcode}</p>
                        </div>)
           })
        }

        return html;
    }

    addAddress(){

        //Need to add checks to see if this is a real place
        let newAddress = encodeURI(`${this.state.newAddress1} ${this.state.newCity},${this.state.newState} ${this.state.newPostalcode}`)
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newAddress}`)
            .then(res=>{
                console.log(res.data.results[0])
                let add = res.data.results[0].address_components;
                let lat = res.data.results[0].geometry.location.lat
                let long = res.data.results[0].geometry.location.lng
                console.log(add)
                this.setState({
                    newAddress1:`${add[0].short_name} ${add[1].short_name}`,
                    newCity:add[3].short_name,
                    newState:add[5].short_name,
                    newPostalcode:add[7].short_name,
                    newLat:lat,
                    newLong:long,
                },()=>this.addAddressToDatabase())
            })
            .catch(err=>console.log(err))
    }

    addAddressToDatabase(){
        axios.post(`/api/addUserAddress/${this.props.state.user_id}`,this.state)
            .then(res=>alert("yay"))
            .catch(err=>alert(err))
    }
  render() {
    return (
     <div className="ProfileMainContainer">
         {this.displayProfile()}
         <div>Addresses
             {this.displayAddresses()}
         </div>
         
         <input onChange={e=>this.setState({newAddress1:e.target.value})} />
         <input onChange={e=>this.setState({newCity:e.target.value})} />
         <input onChange={e=>this.setState({newState:e.target.value})} />
         <input onChange={e=>this.setState({newPostalcode:e.target.value})} />
         <input onChange={e=>this.setState({newPlaceName:e.target.value})} />
         <button onClick={e=>this.addAddress()}>Add new address</button>
     </div>
    );
  }
}

const mapStateToProps = state =>{
    return{
        state:state,
    }
}

export default connect(mapStateToProps,{updateUser})(Profile);