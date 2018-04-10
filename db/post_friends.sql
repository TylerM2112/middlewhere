INSERT INTO notification (receiver, sender, type, type_id) values($1,$2,$3, null)

-- ideas - 

--take selected friend and push to friends array in front-end 
--then fetch current friends from database concat the response 
--  with the front end friends array. -- then loop over and remove duplicates and insert into mw_users table in friends