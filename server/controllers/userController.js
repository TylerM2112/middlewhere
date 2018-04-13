module.exports = {
  //get the user info and the addresses of that user
  getUserInfo: (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.params;

    var addresses = '';
    let userInfo = '';

    db.get_user_info([req.session.user.user_id])
      .then(user => {

        //if the user has addresses gets them from the database
        user[0].address_count = +user[0].address_count
        userInfo = user[0];

        console.log('req.session.user', req.session.user)

        if (userInfo.address_count !== 0 || typeof userInfo.address_count === 'undefined') {
          db.get_user_addresses([req.session.user.user_id])
            .then(address => {
              let userObj = Object.assign({}, userInfo);
              userObj.addresses = [];

              for (let i = 0; i < address.length; i++) {
                userObj.addresses.push(address[i]);
              }

              res.status(200).send(userObj);
            })
            .catch(err =>{ console.log("userController.getUserInfo get_user_addresses",err);})
        }
        else {
          res.status(200).send(user[0]);
        }
      })
      .catch(err => {
        console.log("userController.getUserInfo",err);
        res.status(500).send(err);
      })

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

    const { newAddress1, newCity, newState, newPostalcode, newPlaceName, newLat, newLong, defaultaddress } = req.body;
    const { user_id } = req.params;
    const db = req.app.get('db');

    db.add_user_address([ newAddress1, newCity, newState, newPostalcode, newPlaceName, newLat, newLong, user_id, defaultaddress ])
      .then(response => res.status(200).send(response))
      .catch(err => {
        console.log("userController.addUserAddress",err);
        res.status(500).send(err);
      })
  },

  //gets all the users in the database
  get_users: (req, res) => {
    const db = req.app.get('db')

    db.get_users()
      .then((users) => { res.status(200).send(users) })
      .catch((err) => {
        console.log("userController.get_users",err);
        res.status(500).send(err);
      })
  },

  removeAddress: (req, res) => {
    const { auto_id } = req.params;
    const db = req.app.get('db');

    db.remove_address([auto_id])
      .then(response => {res.status(200).send(response.auto_id) })
      .catch(err => {
        console.log("userController.removeAddress",err);
        res.status(500).send(err);
      });
  },

  getNotifications: (req, res) => {
    const { user_id } = req.params;
    const db = req.app.get('db');
    console.log(req.params)
    db.get_notifications([+user_id])
      .then(arr => {
        console.log("HAHAHAHAHAHAHAHAHAHA", arr);
        let friendArr = arr.filter(e => e.type === "friend")
        let groupArr = arr.filter(e => e.type === "group")
        let eventArr = arr.filter(e => e.type === "event")
        let notificationArr = [];

        notificationArr.push(friendArr);
        notificationArr.push(groupArr);
        notificationArr.push(eventArr);

        res.status(200).send(notificationArr);
      }).catch(error => {
        console.log("userController.getNotifications",err);
        res.status(500).send(err);
      })
  }, 

  remove_notification: (req, res) => {
    const db = req.app.get('db');
    let { notification_id } = req.params

    db.remove_notification([notification_id])
      .then(()=>res.status(200).end())
      .catch(error => {
        console.log("userController.remove_notification",err);
        res.status(500).send(err);
      })
  }, 
  
  editAddress: (req, res) => {
    const db = req.app.get('db');
    let { auto_id } = req.params
    const { newAddress1, newCity, newState, newPostalcode, newPlaceName, newLat, newLong } = req.body;

    db.edit_address([ auto_id, newAddress1, newCity, newState, newPostalcode, newLong, newLat, newPlaceName ])
      .then(response => { res.status(200).send(response) })
      .catch(err => {
        console.log("userController.editAddress",err);
        res.status(500).send(err);
      })
   },

   search_user: (req, res) => {
    const db = req.app.get('db');
    let { users } = req.params

    db.search_user([users])
      .then((usersFromDb) => { res.status(200).send(usersFromDb) })
      .catch((err) => {
        console.log("userController.search_user",err);
        res.status(500).send(err);
      })
  },
    
  //updates the default address
  updateDefaults: (req, res) => {
    const db = req.app.get('db');
    const { auto_id } = req.body;
    const { user_id } = req.params
    
    db.update_defaults([user_id, auto_id])
      .then(response => { res.status(200).send(response) })
      .catch(err => { 
        console.log("userController.updateDefaults",err);
        res.status(500).send(err);
      })
  }
}