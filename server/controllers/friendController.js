module.exports = {
    get_friends: (req,res) => {
        const dbInstance = req.app.get('db')
        
        dbInstance.get_friends()
        .then((friends) =>{
            res.status(200).send(friends)
        })
        .catch((err) => {
            console.log('err', err)
            res.status(500).send(err)
        })
    },

    post_friends: (req, res) => {
        const dbInstance = req.app.get('db');
        const {receiver, sender, type} = req.body

        dbInstance.post_friends([receiver, sender, type])
        .then((friends) => {
            res.status(200).send("request has been sent for approval")
        })
        .catch((err) => {
            console.log('err', err)
        })
    }
}