module.exports = {
    post_group: (req, res) => {
        const dbInstance = req.app.get('db')
        const {group_title, group_members, group_purpose,group_admin} = req.body

        dbInstance.post_group([group_title, group_purpose, group_members,group_admin])
        .then(() => {
            res.status(200).send("group entered into DB")
        })
        .catch((err) => {
            console.log('err', err)
        })
    }, 
  
    approve_group: (req, res) => {
        const dbInstance = req.app.get('db')
        const { receiver, type_id } = req.body

        dbInstance.confirm_group([+receiver, +type_id])
            .then(res => { 
            })
            .catch(err => {
                console.log("Confirm Friend Controller Error", err)
             })
     },
  
    getGroups: (req, res) => {
        const db = req.app.get('db');
        const { user_id } = req.params;

        db.get_user_groups(+user_id)
            .then(groups=>res.status(200).send(groups))
            .catch(err=>res.status(500).send(err));
    },
    getGroupMembers:(req,res)=>{
        const db = req.app.get('db');
        const {group_id} = req.params;
        db.get_group_members([+group_id])
            .then(users=>res.status(200).send(users))
            .catch(err=>res.status(500).send(err));
    },
    deleteUserFromGroup:(req,res)=>{
        const db = req.app.get('db');
        const {group_id,user_id} = req.params;

        db.remove_user_from_group([+group_id,+user_id])
            .then(e=>{
                db.get_user_groups([+user_id])
                    .then(groups=>res.status(200).send(groups))
                    .catch(err=>res.status(500).send(err))
            })
            .catch(err=>res.status(500).send(err));
    }
}