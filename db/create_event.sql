INSERT INTO events (event_lat,event_long,event_name,event_date,event_time,event_admin,event_deadline)
VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;