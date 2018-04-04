module.exports = {
  getUserInfo: (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.params;

    var addresses = '';
    let userInfo = '';

    db.get_user_info([user_id])
      .then(user=>{

        user[0].address_count = +user[0].address_count
        userInfo = user[0];

        if(userInfo.address_count !== 0){
          db.get_user_addresses([user_id])
            .then(address =>{
              let userObj = Object.assign({},userInfo);
              userObj.addresses = []

              for(let i = 0;i<address.length;i++){
                userObj.addresses.push(address[i])
              }
              res.status(200).send(userObj)
            }).catch(err=>console.log(err))
        }
        else{
          res.status(200).send(user)
        }
      })
      .catch(err=>console.log(err))

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
  addUserAddress:(req,res) =>{
    console.log(req.body);
    console.log(req.params)

    const {newAddress1,newCity,newState,newPostalcode,newPlaceName,newLat,newLong} = req.body;

    const {user_id} = req.params;

    const db = req.app.get('db');

    db.add_user_address([newAddress1,newCity,newState,newPostalcode,newPlaceName,newLat,newLong,user_id])
      .then(()=>res.status(200).end())
      .catch(err=>console.log(err))
  }
}