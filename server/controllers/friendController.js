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
    }
}