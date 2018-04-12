import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class ViewEvents extends Component {

    componentDidMount() {
        axios.get(`/api/getUserEvents/${this.props.state.user_id}`)
            .then(res=>console.log(res.data));
    }
    render() {
        return (
            <div>hi</div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        state:state,
    }
}

export default connect(mapStateToProps)(ViewEvents);