module.exports = {
    post_group: (req, res) => {
        const dbInstance = req.app.get('db')
        console.log('req.body', req.body)

        const {group_title, group_members, group_purpose} = req.body

        dbInstance.post_group([group_title, group_purpose, group_members])
        .then(() => {
            res.status(200).send("group entered into DB")
        })
        .catch((err) => {
            console.log('err', err)
        })
    }
}