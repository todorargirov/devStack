-- Creation of postgres user, db, grant:
CREATE USER firefly WITH PASSWORD 'firefly';
CREATE DATABASE firefly OWNER firefly ENCODING = 'UTF8';
GRANT ALL PRIVILEGES ON DATABASE firefly TO firefly;
-- Create simple user table and insert mock record
CREATE TABLE ff_users (
  id serial PRIMARY KEY,
  user_name VARCHAR(50) UNIQUE NOT NULL,
  user_type VARCHAR(20) NOT NULL DEFAULT 'Guest',
  date_created TIMESTAMPTZ,
  date_updated TIMESTAMPTZ,
  date_deleted TIMESTAMPTZ
);
INSERT INTO ff_users (
    user_name,
    user_type,
    date_created,
    date_updated,
    date_deleted
  )
VALUES
  ('testuser', 'Guest', now(), null, null),
  ('admin', 'Admin', now(), null, null);