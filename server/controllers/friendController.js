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
    },

    delete_friend: (req,res) => {
        const dbInstance = req.app.get('db')
        let {id} = req.params

        dbInstance.delete_friend([id])
            .then(() => {
                res.status(200).send('friend deleted')
            })
            .catch(err => {
                console.log("err", err)
             })
    }
}