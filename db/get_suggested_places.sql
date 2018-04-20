SELECT DISTINCT place_id,
COUNT(*)
FROM suggested_event_places WHERE event_id = $1 GROUP BY place_id;