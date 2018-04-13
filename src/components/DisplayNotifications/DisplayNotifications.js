import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateNotifications } from './../../ducks/reducer';
import { Link } from 'react-router-dom';

class DisplayNotifications extends Component {
  constructor() { 
    super();
    this.state = {
      toggleFriends: false,
			toggleGroups: false,
      toggleEvents: false,
      notifications: [],
    }

		this.displayNotifications = this.displayNotifications.bind(this);
		this.approved = this.approved.bind(this);
		this.removeNotification = this.removeNotification.bind(this);
    
  }

  componentWillReceiveProps(props) {
    console.log(props);
    this.setState({
      notifications: props.notifications
    })
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
			console.log("RUNNING")	
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
			default:
				break;
		}
	}

  displayNotifications() {
		if (this.state.notifications.length !== 0) {
			return (

				<div className="notificationsContainer" >
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
              console.log(e)
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
								return (
									<div className={this.state.toggleEvents ? "requestContainer" : "eventsOff"}>
										<div className="requestPicContainer">
											<img src={e.picture} alt="profilepic" />
										</div>
										<div className="requestInfoContainer">
											
											<p>{e.notification_name}</p>
											{console.log("EEEEEEEEEEEEEEEEEEEEE",e)}
											<p>On {e.event_date} at {e.event_time.substr(0, 2) < 12 ? `${e.event_time} AM` : e.event_time.substr(0, 2) - 12 + e.event_time.substr(2, 3) + "PM"}</p>
											<Link to={{
												pathname: "/events/select",
												state:
													e.group_id,
													isCreating: false
											
											}}><button className="approveButton" onClick={() => this.approved(e)}>Approve</button></Link>
											<button className="declineButton" onClick={() => this.removeNotification(e)}>Decline</button>
										</div>
									</div>
								)
							})}
						</div>
					}
				</div>
			)
		}
	}

  render() {
    return (
    <div>
        {this.props.state.user_id ?   
        this.displayNotifications()
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

export default connect(mapStateToProps, { updateNotifications })(DisplayNotifications);