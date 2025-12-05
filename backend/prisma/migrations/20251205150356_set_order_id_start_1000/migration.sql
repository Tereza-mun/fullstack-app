-- Set the Order ID sequence to start at 1000
-- This will only affect new orders created after this migration
SELECT setval(pg_get_serial_sequence('"Order"', 'id'), 1000, false);