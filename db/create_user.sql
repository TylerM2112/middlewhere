INSERT INTO mw_users (auth0_id, name, email, phone, picture) values ($1, $2, $3, $4, $5)
RETURNING *;
