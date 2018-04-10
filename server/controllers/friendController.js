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
    confirm_friend: (req, res) => {
        const dbInstance = req.app.get('db')
        let { receiver, sender } = req.body

        dbInstance.confirm_friend([+receiver, +sender])
            .then(res => { 
            })
            .catch(err => {
                console.log("Confirm Friend Controller Error", err)
             })
    }
}