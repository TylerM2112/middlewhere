module.exports = function(req, res, next){
    // // console.log('req.body', req.body)
    const {group_title, group_members, group_purpose} = req.body

        if(group_title.length > 1 && group_title.length < 30){
            console.log('has title')
            if(group_members.length > 0){
                console.log('has members')
                if(group_purpose.length > 1){
                    console.log('has purpose')
                    next()
                }else {
                    res.status(400).json(`failed to validate form at group_purpose`)
                }
            }else {
                res.status(400).json(`failed to validate form at group_members`)
            }
        } else {
            res.status(400).json(`failed to validate form at group_title`)
        }
}