module.exports = {
    post_event: (req, res) => {
        const dbInstance = req.app.get('db')


        const {user_id, event_name, event_date, event_start, event_end, event_location, event_picture, event_description} = req.body

        dbInstance.post_event([user_id, event_name, event_date, event_start, event_end, event_location, event_picture, event_description])
        .then(() => {
            //sending message upon confirmation
            res.status(200).send('confirmed to db')
        })
        .catch((err) => {
            console.log('err', err)
        })
    }, 

    approve_event: (req, res) => {
        const dbInstance = req.app.get('db')
        const { receiver, type_id } = req.body

        dbInstance.confirm_event([+receiver, +type_id])
            .then(res => { 
            })
            .catch(err => {
                console.log("Confirm Event Controller Error", err)
             })
     }
}