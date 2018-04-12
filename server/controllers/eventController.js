

module.exports = {
  post_event: (req, res) => {
    const db = req.app.get('db')
    const { user_id, event_name, event_date, event_start, event_end, event_location, event_picture, event_description } = req.body

    db.post_event([user_id, event_name, event_date, event_start, event_end, event_location, event_picture, event_description])
      .then(() => {
        //sending message upon confirmation
        res.status(200).send('confirmed to db')
      })
      .catch((err) => { 
        console.log("eventController.post_event", err)
        res.status(500).send(err);
      })
  },
  approve_event: (req, res) => {
    const db = req.app.get('db')
    const { receiver, type_id } = req.body

    db.confirm_event([+receiver, +type_id])
      .then(res => {
      })
      .catch(err => {
        console.log("eventController.approve_event",err)
        res.status(500).send(err)
      })
  },

  //Gets the users of the selected groups and their default locations
  createEvent: (req, res) => {
    const db = req.app.get('db');
    const { selectedGroups } = req.body;

    //Does the dynamic insert statement to get all the group member addresses
    let get = ["SELECT DISTINCT mw_address.user_id,mw_address.lat,mw_address.long FROM group_members JOIN mw_address ON mw_address.user_id = group_members.user_id WHERE("];

    selectedGroups.map(e => {
      get.push(` group_id = ${e} OR`)
    })
    get = get.join("")
    get = get.substr(0, get.length - 2)
    get += ") AND mw_address.defaultaddress = true"

    db.run(get)
      .then(users => {res.status(200).send(users) })
      .catch(err => { 
        console.log("eventController.createEvent",err)
        res.status(500).end(err) 
      });
  },

  //ACTUALLY CREATES THE EVENT, NOTIFICATIONS, AND SUGGESTED PLACES
  createEventFinal: (req, res) => {
    const db = req.app.get('db');
    const { markers, middlepoint, groupAdmin, eventDate, eventTime, eventDeadline, users, userId, eventName } = req.body;
    let event_id = null;

    db.create_event([middlepoint[0], middlepoint[1], eventName, eventDate, eventTime, userId, eventDeadline])
      .then(resp => {
        event_id = resp[0].auto_id;

        //DYNAMICALLY CREATES THE INSERT FOR THE NOTIFCATIONS
        insert = ["INSERT INTO notification (sender,receiver,type,type_id) VALUES "];

        users.map(e => {
          if (e.user_id != userId) {
            insert.push(`(${userId},${e.user_id},'group',${event_id})`)
          }
        });

        insert = insert.join(",").replace("VALUES ,", "VALUES ");

        db.run(insert).then().catch(err => console.log("eventController.createEventFinal insert into notification",err));

        //CREATES A EVENT MEMBER FOR THE USER THAT IS CREATING THE EVENT
        db.run(`INSERT INTO event_members (event_id,user_id) VALUES (${event_id},${userId})`).then().catch(err => console.log("eventController.createEventFinal insert into event_members",err));

        //DYNAMICALLY CREATES THE INSERT STATEMENT FOR THE SUGGESTED PLACES
        insert = ["INSERT INTO suggested_event_places (user_id,event_id,place_id) VALUES "];

        markers.map(e => { insert.push(`(${userId},${event_id},'${e.placeId}')`)});

        insert = insert.join(",").replace("VALUES ,", "VALUES ");

        db.run(insert).then().catch(err => console.log("eventController.createEventFinal insert into suggested_event_places",err));

      })
      .catch(err => {
        console.log("eventController.createEventFinal",err);
        res.status(500).send(err);
      });
  }
}