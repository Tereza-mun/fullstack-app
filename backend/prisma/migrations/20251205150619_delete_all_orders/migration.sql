-- Delete all existing orders and order items
DELETE FROM "OrderItem";
DELETE FROM "Order";

-- Reset the sequence to start from 1000
SELECT setval(pg_get_serial_sequence('"Order"', 'id'), 1000, false);