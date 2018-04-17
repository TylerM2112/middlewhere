SELECT events.*,
mw_users.name,
mw_users.picture,
(SELECT COUNT(*) FROM  event_members WHERE event_members.event_id = events.auto_id)

FROM event_members

JOIN events
ON event_members.event_id = events.auto_id

JOIN mw_users
ON events.event_admin = mw_users.auto_id

WHERE user_id = $1