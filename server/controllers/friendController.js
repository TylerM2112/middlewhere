module.exports = {
    get_friends: (req,res) => {
        const db = req.app.get('db')
        const {user_id} = req.params;

        db.get_friends([+user_id])
        .then((friends) => { res.status(200).send(friends) })
        .catch((err) => { 
            console.log("friendController.get_friends",err)
            res.status(500).send(err) 
        })
    },

    post_friends: (req, res) => {
        const db = req.app.get('db');
        const {receiver, sender, type} = req.body

        db.post_friends([receiver, sender, type])
            .then((friends) => { res.status(200).send("request has been sent for approval") })
            .catch((err) => { 
                console.log("friendController.post_friends",err)
                res.status(500).send(err) 
            });
    },
  
    confirm_friend: (req, res) => {
        const db = req.app.get('db')
        const { receiver, sender } = req.body

        db.confirm_friend([+receiver, +sender])
            .then(()=> res.status(200).end() )
            .catch(err => { 
                console.log("friendController.confirm_friend",err)
                res.status(200).send(err) 
            })
    },

    delete_friend: (req,res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.delete_friend([id])
            .then(() => { res.status(200).send('friend deleted') })
            .catch(err => { 
                console.log("friendController.delete_friend",err)
                res.status(500).send(err) 
            });
    }
}