SELECT * FROM event_members 

JOIN mw_address
ON mw_address.user_id = event_members.user_id

WHERE event_members.event_id = $1 AND mw_address.defaultaddress = true;