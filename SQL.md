## SQL Server
This should just work for now (I found a free cloud SQL service to temporarily use)
### Setup
1. Install PostgreSQL
2. Create databases MapDB, UserDB, and MLDB
3. Create the tables in each database: copy and paste the CREATE TABLE commands below into PGAdmin's query tool (don't copy the INSERT commands, those are just examples)
4. Add server info (namely the password) to the .env files in both the Interface and Backend folders

### MapDB
CREATE DATABASE MapDB;

CREATE TABLE fires (id SERIAL, latitude FLOAT, longitude FLOAT, risk FLOAT, time BIGINT, PRIMARY KEY (id));

INSERT INTO fires (latitude, longitude, risk, time) VALUES (0, 0, 0, 0);

### UserDB
CREATE DATABASE UserDB;

CREATE TABLE emails (email varchar(320), latitude FLOAT, longitude FLOAT);

CREATE TABLE numbers (phone_number INTEGER, latitude FLOAT, longitude FLOAT);

INSERT INTO emails (email, latitude, longitude) VALUES ('fakeemail@gmail.com', 0, 0);

INSERT INTO numbers (phone_number, latitude, longitude) VALUES (0123456789, 0, 0);

### MLDB
CREATE DATABASE MLDB;

CREATE TABLE fireandweather (latitude FLOAT, longitude FLOAT, fire BOOLEAN, temp_max FLOAT, temp_min FLOAT, wind_gust FLOAT, wind_speed FLOAT, cloudcover FLOAT, precip_prob INTEGER, precip_cover FLOAT);

CREATE TABLE vegetation (latitude FLOAT, longitude FLOAT, ndvi VARCHAR(100));

INSERT INTO fireandweather (latitude, longitude, fire, temp_max, temp_min, wind_gust, wind_speed, cloudcover, precip_prob, precip_cover) VALUES (0, 0, TRUE, 0, 0, 0, 0, 0, 0, 0);

INSERT INTO vegetation (latitude, longitude, ndvi) VALUES (0, 0, '');