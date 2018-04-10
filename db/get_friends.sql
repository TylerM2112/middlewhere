SELECT *,
CASE 
    WHEN user_id = 4 THEN (SELECT mw_users.name FROM mw_users WHERE auto_id = friend_id)
    WHEN friend_id = 4 THEN (SELECT mw_users.name FROM mw_users WHERE auto_id = user_id)
END as friend_name,

CASE 
    WHEN user_id = 4 THEN (SELECT mw_users.picture FROM mw_users WHERE auto_id = friend_id)
    WHEN friend_id = 4 THEN (SELECT mw_users.picture FROM mw_users WHERE auto_id = user_id)
END as friend_picture

FROM friends