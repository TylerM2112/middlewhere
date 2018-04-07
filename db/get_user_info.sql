
SELECT *,
(SELECT COUNT(*) FROM mw_address WHERE mw_address.user_id = $1 ) as address_count
FROM mw_users
WHERE mw_users.auto_id = $1

