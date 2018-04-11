SELECT mw_users.name,
mw_users.picture,
mw_users.auto_id
FROM group_members 
JOIN mw_users
ON mw_users.auto_id = group_members.user_id
WHERE group_id = $1