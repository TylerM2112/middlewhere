SELECT 
groups.group_id,
groups.group_title,
groups.group_purpose,
groups.group_admin,
mw_users.name,
mw_users.picture,
(SELECT COUNT(*) FROM group_members WHERE group_members.group_id = groups.group_id) as group_member_count

FROM group_members

JOIN groups
ON group_members.group_id = groups.group_id

JOIN mw_users
ON mw_users.auto_id = groups.group_admin

WHERE group_members.user_id = $1 OR group_admin = $1;