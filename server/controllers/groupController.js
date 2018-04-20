module.exports = {

  //Creates a group and sends out notifications
  post_group: (req, res) => {
    const db = req.app.get('db')
    const { group_title, group_members, group_purpose, group_admin } = req.body
    let group_id = null;

    db.pos
    t_group([group_title, group_purpose, group_admin])
      .then((group) => {
        group_id = group[0].group_id

        //Dynamically creates the insert statement for the notification
        let insert = ["INSERT INTO notification (sender,receiver,type,type_id) VALUES "]

        group_members.map(e => {
          insert.push(`(${group_admin},${e},'group',${group_id})`);
        })

        insert = insert.join(",").replace("VALUES ,", "VALUES ")

        //TURN THIS BACK INTO A .THEN AND .CATCH
        db.run(insert, function (err, res) {
          if (err) {
            res.status(500).send(err)
          }
          else {
            console.log("groupController.post_group INSERT INTO notification",err)
            res.status(200).end();
          }
        });

        //Inserts the group admin into the group_members table
        db.run(`INSERT INTO group_members (group_id,user_id) VALUES (${group_id},${group_admin})`, function (err, res) {
          if (err) { 
            res.status(500).send(err) 
          }
          else {
            console.log("groupController.post_group INSERT INTO group_members",err)
            res.status(200).end();
          }
        });
      })
      .catch((err) => { res.status(500).send(err) })
  },

  approve_group: (req, res) => {
    const db = req.app.get('db')
    const { receiver, type_id } = req.body

    db.confirm_group([+receiver, +type_id])
      .then(response => {
        res.status(200).end()
      })
      .catch(err => {
        console.log("groupController.approve_group", err)
        res.status(500).send(err);
      })

  },

  //GET ALL THE USER GROUPS
  getGroups: (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.params;
    db.get_user_groups(user_id)
      .then(groups => res.status(200).send(groups))
      .catch(err => {
        console.log("groupController.getGroups",err)
        res.status(500).send(err) 
      });
  },

  //get All group members
  getGroupMembers: (req, res) => {
    const db = req.app.get('db');
    const { group_id } = req.params;
    console.log('group_id', group_id)
    db.get_group_members([+group_id])
      .then(users => res.status(200).send(users))
      .catch(err => {
        console.log("groupController.getGroupMembers",err)
        res.status(500).send(err)
      });
  },

  //delete a user from a group
  deleteUserFromGroup: (req, res) => {
    const db = req.app.get('db');
    const { group_id, user_id } = req.params;

    db.remove_user_from_group([+group_id, +user_id])
      .then(e => {
        db.get_user_groups([+user_id])
          .then(groups => res.status(200).send(groups))
          .catch(err => {
            console.log("groupController.deleteUserFromGroup",err)
            res.status(500).send(err)
          })
      })
      .catch(err => res.status(500).send(err));
  }
}