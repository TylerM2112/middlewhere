SELECT notification.*, 
mw_users.name,
mw_users.picture,

CASE 
    WHEN notification.type = 'event' THEN (SELECT event_name FROM events WHERE auto_id = notification.type_id)
    WHEN notification.type = 'group' THEN (SELECT group_title FROM groups WHERE group_id = notification.type_id)
    ELSE 'null'
END as notification_name,

CASE 
    WHEN notification.type = 'group' THEN (SELECT group_purpose FROM groups WHERE group_id = notification.type_id)
    ELSE 'null'
END as purpose,

CASE 
    WHEN notification.type = 'event' THEN (SELECT event_date FROM events WHERE auto_id = notification.type_id)
    ELSE 'null'
END as event_date,

CASE 
    WHEN notification.type = 'event' THEN (SELECT event_time FROM events WHERE auto_id = notification.type_id)
    ELSE 'null'
END as event_time

FROM notification

JOIN mw_users
ON mw_users.auto_id = notification.sender
WHERE receiver = $1;