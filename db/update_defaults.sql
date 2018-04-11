UPDATE mw_address SET defaultaddress = false WHERE user_id = $1;
UPDATE mw_address SET defaultaddress = true WHERE auto_id =$2;
SELECT * FROM mw_address WHERE user_id = $1;