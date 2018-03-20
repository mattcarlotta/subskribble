DROP DATABASE IF EXISTS "subskribble-demo";
CREATE DATABASE "subskribble-demo";

\c subskribble-demo;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS subscribers;
DROP TABLE IF EXISTS plans;

CREATE TABLE subscribers (
  id VARCHAR(36) DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  status VARCHAR(20) DEFAULT 'inactive',
  email VARCHAR,
  subscriber VARCHAR NOT NULL,
  password VARCHAR,
  phone VARCHAR,
  plan VARCHAR,
  startDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY'),
  endDate TEXT,
  amount DECIMAL(12,2),
  isGod BOOLEAN DEFAULT FALSE
);

CREATE TABLE plans (
  id VARCHAR(36) DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  status VARCHAR(20) DEFAULT 'inactive',
  planName VARCHAR(40) NOT NULL,
  amount DECIMAL(12,2),
  setupFee DECIMAL(12,2),
  billEvery VARCHAR(10),
  trialPeriod VARCHAR(10),
  subscribers INTEGER
);

INSERT INTO subscribers (status, email, subscriber, password, phone, plan, endDate, amount)
  VALUES
  ('active', 'admin@admin.com', 'Admin', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('active', 'squatters@gmail.com', 'Sherry Waters', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('active', 'bob-eh@sap.com', 'Bob Aronssen', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('active', 'shani.smith@hotmail.com', 'Shaniqua Smith', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('active', 'tanyaballschin@gmail.com', 'Tanya Ballschin', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('active', 'lukeskywalker@rebelforce.com', 'Siemen Walker', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('active', 'jTank@aol.com', 'Jenny Tanks', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('active', 'amberLamps@yahoo.com', 'Amber Lalampas', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('active', 'kylebTeegue@gmail.com', 'Kyle Teegue', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('active', 'snakePiliskin@gmail.com', 'Gary Pilkinson', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('active', 'yasminRod@hotmail.com', 'Yasmin Rodrigues', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('active', 'adaDamn@photonmail.com', 'Adam Johnson', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('inactive', 'carlsagan42@yahoo.com', 'Carl Sagan', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 3, 2018', 29.99),
  ('inactive', 'seamark@outlook.com', 'Mark Canelo', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 12, 2018', 29.99),
  ('suspended', 'axxll@manjaro.com', 'Axle Root', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 16, 2018', 29.99),
  ('inactive', 'vicksAdam@sap.com', 'Adamn Vicks', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99),
  ('inactive', 'wallyworld@manjaro.com', 'Wes Walls', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99),
  ('suspended', 'kellyUll@gmail.com', 'Kelly Ullman', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99),
  ('inactive', 'oatesA@aol.com', 'Adam Oates', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99),
  ('suspended', 'scottParker@jaro.com', 'Scott Parker', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 21, 2018', 29.99),
  ('suspended', 'asmLossenger@mancusco.com', 'Emily Loz', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 22, 2018', 29.99),
  ('inactive', 'pparks@akins.com', 'Parker Posey', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 29, 2018', 29.99),
  ('suspended', 'aleashtrails@kilmas.com', 'Alisha Tallis', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 29, 2018', 29.99),
  ('suspended', '88Damon@photonmail.com', 'Damien Smith', 'password', '(555) 555-5555', 'Carlotta Prime', 'Jan 29, 2018', 29.99);

INSERT INTO plans (status, planName, amount, setupFee, billEvery, trialPeriod, subscribers)
  VALUES
  ('active', 'Carlotta Prime', 99.99, 0.00, '30 days', '30 days', 299),
  ('active', 'Carlotta Switch', 49.99, 0.00, '30 days', '30 days', 85),
  ('active', 'Carlotta Corp', 299.99, 4.99, '30 days', '30 days', 35048),
  ('active', 'Carlotta Inc.', 1999.99, 399.99, '30 days', '30 days', 14058),
  ('active', 'Carlotta LLC', 499.99, 299.99, '30 days', '30 days', 11),
  ('active', 'Carlotta Dealership', 699.99, 24.99, '30 days', '30 days', 400),
  ('active', 'Carlotta Affiliates', 79.99, 9.99, '30 days', '30 days', 29),
  ('active', 'Carlotta Sales', 9.99, 0.00, '30 days', '30 days', 642),
  ('active', 'Carlotta Automechs', 14.99, 249.99, '30 days', '30 days', 22),
  ('active', 'Carlotta Solar', 44.99, 199.99, '30 days', '30 days', 751),
  ('active', 'Carlotta Twitch', 4.99, 0.00, '30 days', '30 days', 256),
  ('active', 'Carlotta Youtube', 1.99, 0.00, '30 days', '30 days', 81),
  ('inactive', 'Carlotta .com', 69.99, 0.00, '30 days', '30 days', 23),
  ('inactive', 'Carlotta Partners', 99.99, 0.00, '30 days', '30 days', 214),
  ('inactive', 'Carlotta Church', 0.00, 0.00, '30 days', '30 days', 845),
  ('inactive', 'Carlotta Industries', 149.99, 29.99, '30 days', '30 days', 6514),
  ('inactive', 'Carlotta Workshops', 39.99, 5.99, '30 days', '30 days', 742),
  ('inactive', 'Carlotta Sports', 19.99, 0.00, '30 days', '30 days', 611),
  ('inactive', 'Carlotta Cars Magazine', 2.99, 0.00, '30 days', '30 days', 125862),
  ('inactive', 'Carlotta Flagships', 18.99, 0.00, '30 days', '30 days', 125),
  ('inactive', 'Carlotta Protocols', 15.99, 0.00, '30 days', '30 days', 487),
  ('inactive', 'Carlotta ISP', 89.99, 99.90, '30 days', '30 days', 329),
  ('inactive', 'Carlotta Pumps', 279.99, 198.89, '30 days', '30 days', 4),
  ('inactive', 'Carlotta Assoc.', 69.99, 0.00, '30 days', '30 days', 645);
