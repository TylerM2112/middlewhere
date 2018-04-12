module.exports = function(req, res, next){
    // // console.log('req.body', req.body)
    const {group_title, group_members, group_purpose} = req.body

        if(group_title.length > 1 && group_title.length < 30){
            
            if(group_members.length > 0){

                if(group_purpose.length > 1){
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