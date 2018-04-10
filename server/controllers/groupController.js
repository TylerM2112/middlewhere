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
    getGroups:(req,res) =>{
        const db = req.app.get('db');
        const {user_id}  = req.params;

        db.get_user_groups(+user_id)
            .then(groups=>res.status(200).send(groups))
            .catch(err=>res.status(500).send(err));
    }
}