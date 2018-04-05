module.exports = {
    post_group: (req, res) => {
        const dbInstance = req.app.get('db')
        const {group_title, group_admin, group_purpose} = req.body

        dbInstance.post_group([group_title, group_admin, group_purpose])
        .then(() => {
            res.status(200).send("group entered into DB")
        })
        .catch((err) => {
            console.log('err', err)
        })
    }
}