module.exports = {
  getUserInfo: (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.params;

    db.get_user_info([user_id])
      .then(user=>{
        user[0].address_count = +user[0].address_count
        res.status(200).send(user[0])
      })
      .catch(err=>console.log(err))
  }
}