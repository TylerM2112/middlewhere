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
  render() {
    return (
     <div className="ProfileMainContainer">
         {excon.blue(this.props.state)}
         {this.displayProfile()}
         <div>Addresses
             {this.displayAddresses()}
         </div>
         <input onChange={e=>this.setState({newAddress1:e.target.value})} />
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