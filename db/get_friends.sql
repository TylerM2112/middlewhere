SELECT *,
CASE 
    WHEN user_id = $1 THEN (SELECT mw_users.name FROM mw_users WHERE auto_id = friend_id)
    WHEN friend_id = $1 THEN (SELECT mw_users.name FROM mw_users WHERE auto_id = user_id)
END as friend_name,

CASE 
    WHEN user_id = $1 THEN (SELECT mw_users.picture FROM mw_users WHERE auto_id = friend_id)
    WHEN friend_id = $1 THEN (SELECT mw_users.picture FROM mw_users WHERE auto_id = user_id)
END as friend_picture

FROM friends
WHERE user_id = $1 OR friend_id = $1;


--create user sql