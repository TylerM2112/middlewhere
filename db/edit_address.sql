UPDATE mw_address
SET
  address1 = $2,
  city = $3,
  state = $4,
  postalcode = $5,
  long = $6,
  lat = $7,
  place = $8
WHERE auto_id = $1
RETURNING *;
