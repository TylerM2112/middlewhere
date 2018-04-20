

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
    console.log("LOOK AT ME", req.body);
    const db = req.app.get('db')
    const { receiver, type_id } = req.body

    db.confirm_event([+receiver, +type_id])
      .then(resp => {
        res.status(200).end();
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
    //query string as array in order to map over 
    /////////////////////////***need help with this block\/\/\/ */
    selectedGroups.map(e => {
      //maps over selected groups and creates the where clause for query to db
      get.push(` group_id = ${e} OR`)
      // pushes string to get to complete query statement
    })

    get = get.join("")
    get = get.substr(0, get.length - 2)
    get += ") AND mw_address.defaultaddress = true"

    //using string as sql query
    db.run(get)
    //runs get query
      /////////////////////***need help with this block/\/\/\ */
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
        // console.log("users",users)
        users.map(e => {
          if (e.user_id != userId) {
            insert.push(`(${userId},${e.user_id},'event',${event_id})`)
          }
        });

        insert = insert.join(",").replace("VALUES ,", "VALUES ");
        // console.log(insert);
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
  },
  getEventDetails:(req,res)=>{
    const db = req.app.get('db');
    const {group_id} = req.params
    console.log("get event details",req.params)
    let obj = {};
    let places = [];
    db.get_event_member_locations([+group_id])
      .then(users=>{
        obj.users = users;
        db.get_suggested_places([+group_id])
          .then(place=>{
            places = place;
            console.log(req.session.user.user_id)
            db.get_user_suggested_places([+group_id,req.session.user.user_id])
              .then(userPlaces=>{
                places.map(e=>{
                  let index = userPlaces.findIndex(i=>i.place_id === e.place_id)
                  if(index === -1){
                    e.user_suggestion = false;
                  }
                  else{
                    e.user_suggestion = true;
                  }
                })

                obj.places = places;
                console.log(obj)
                res.status(200).send(obj)
              })
          })
          .catch(err=>{
            console.log(err);
          });
      })
      .catch(err=>{
        console.log("eventController.getEventDetails",err);
        res.status(500).send(err);
      })
  },
  updateEvent:(req,res)=>{
    const {middlepoint,markers,users} = req.body
    const db = req.app.get('db');
    console.log(markers)
    let lat = middlepoint[0]
    let long = middlepoint[1]
    let event_id = +users[0].event_id
    console.log(event_id,lat,long)

    db.run(`UPDATE events SET event_lat = ${lat}, event_long = ${long} WHERE auto_id = ${event_id}`)
      .then()
      .catch(err=>{
        console.log("Eventcontroller.updateEvent",err)
        res.status(500).send(err);
      })

        insert = ["INSERT INTO suggested_event_places (user_id,event_id,place_id) VALUES "];

        markers.map(e => { insert.push(`(${req.session.user.user_id},${event_id},'${e.placeId}')`)});

        insert = insert.join(",").replace("VALUES ,", "VALUES ");

        db.run(insert)
          .then()
          .catch(err => console.log("eventController.createEventFinal insert into suggested_event_places",err));
  },
  getUserEvents:(req,res)=>{
    const db = req.app.get('db');
    const {user_id} = req.params;

    db.get_user_events([+user_id])
      .then(events=>{res.status(200).send(events)})
      .catch(err=>{
        console.log("EventController.getUserEvents",err)
        res.status(500).send(err);
      })
  }

}