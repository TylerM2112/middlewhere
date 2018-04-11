module.exports = {
  getUserInfo: (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.params;

    var addresses = '';
    let userInfo = '';

    db.get_user_info([user_id])
      .then(user => {

        user[0].address_count = +user[0].address_count
        userInfo = user[0];

        if (userInfo.address_count !== 0) {
          db.get_user_addresses([user_id])
            .then(address => {
              let userObj = Object.assign({}, userInfo);
              userObj.addresses = []

              for (let i = 0; i < address.length; i++) {
                userObj.addresses.push(address[i])
              }
              res.status(200).send(userObj)
            }).catch(err => console.log(err))
        }
        else {
          res.status(200).send(user)
        }
      })
      .catch(err => console.log(err))

    //Gets back object:
    //   {
    //     "name": "julia ross",
    //     "email": "julia.ross@example.com",
    //     "phone": "(197)-408-3012",
    //     "picture": "https://randomuser.me/api/portraits/women/59.jpg",
    //     "auto_id": 10,
    //     "address_count": 1,
    //     "addresses": [
    //         {
    //             "auto_id": 10,
    //             "address1": "8821 West Myrtle Avenue",
    //             "city": "Glendale",
    //             "state": "AZ",
    //             "postalcode": "85305",
    //             "long": "-112.2488391",
    //             "lat": "33.5404296",
    //             "user_id": "10",
    //             "place": "home"
    //         },
    //         {
    //             "auto_id": 10,
    //             "address1": "8821 West Myrtle Avenue",
    //             "city": "Glendale",
    //             "state": "AZ",
    //             "postalcode": "85305",
    //             "long": "-112.2488391",
    //             "lat": "33.5404296",
    //             "user_id": "10",
    //             "place": "home"
    //         }
    //     ]
    // }
  },
  addUserAddress: (req, res) => {
    const { newAddress1, newCity, newState, newPostalcode, newPlaceName, newLat, newLong } = req.body;
    const { user_id } = req.params;
    const db = req.app.get('db');

    db.add_user_address([ newAddress1, newCity, newState, newPostalcode, newPlaceName, newLat, newLong, user_id ])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err))
  },

  get_users: (req, res) => {
    const dbInstance = req.app.get('db')

    dbInstance.get_users()
      .then((users) => {
        res.status(200).send(users)
      })
      .catch((err) => {
        console.log('err', err)
        res.status(500).send(err)
      })
  },

  removeAddress: (req, res) => {
    const { auto_id } = req.params;
    const db = req.app.get('db');

    db.remove_address([auto_id]).then(response => {
      res.status(200).send(response.auto_id)
    }).catch(err => console.log(err));
  },

  getNotifications: (req, res) => {
    const { user_id } = req.params;
    const db = req.app.get('db');

    db.get_notifications([+user_id]).then(arr => {
      let friendArr = arr.filter(e => e.type === "friend")
      let groupArr = arr.filter(e => e.type === "group")
      let eventArr = arr.filter(e => e.type === "event")
      let notificationArr = [];

      notificationArr.push(friendArr);
      notificationArr.push(groupArr);
      notificationArr.push(eventArr);

      res.status(200).send(notificationArr);
    }).catch(error => console.log("Notification Fetch Controller Error", error))
  }, 

  remove_notification: (req, res) => {
    const db = req.app.get('db');
    let { notification_id } = req.params

    db.remove_notification([notification_id]).then(res => {
     }).catch(error => console.log("Notification Remove Controller Error", error))
  }, 
  
  editAddress: (req, res) => {
    const db = req.app.get('db');
    let { auto_id } = req.params
    const { newAddress1, newCity, newState, newPostalcode, newPlaceName, newLat, newLong } = req.body;
    db.edit_address([ auto_id, newAddress1, newCity, newState, newPostalcode, newLong, newLat, newPlaceName ])
      .then(response => {
        res.status(200).send(response)
      })
      .catch(err => {
        console.log("Edit Address userController Error", err)

       })
   },

   search_user: (req, res) => {
    const dbInstance = req.app.get('db');
    let { users } = req.params

    console.log('users', users)

    dbInstance.search_user([users])
    .then((usersFromDb) => {
      res.status(200).send(usersFromDb)
    })
    .catch((err) => {
      console.log('err', err)
    })
      })
  }, 
  updateDefaults: (req, res) => {
    const db = req.app.get('db');
    const { auto_id } = req.body;
    const { user_id } = req.params
    
    db.update_defaults([user_id, auto_id]).then(response => {
      res.status(200).send(response)
    }).catch(err => { 
      console.log("Update Defaults Controller", err)
    })
    
   }
}