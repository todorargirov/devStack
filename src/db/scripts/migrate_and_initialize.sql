-- Creation of postgres user, db, grant:
CREATE USER firefly WITH PASSWORD 'firefly';
CREATE DATABASE firefly OWNER firefly ENCODING = 'UTF8';
GRANT ALL PRIVILEGES ON DATABASE firefly TO firefly;
-- Create simple user table and insert one record
CREATE TABLE ff_users (
  id serial PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL
);
INSERT INTO ff_users (username)
VALUES
  ('testuser');