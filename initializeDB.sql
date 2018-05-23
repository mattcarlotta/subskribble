DROP DATABASE IF EXISTS "subskribble-demo";
CREATE DATABASE "subskribble-demo";

\c subskribble-demo;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS subscribers;
DROP TABLE IF EXISTS plans;
DROP TABLE IF EXISTS promotionals;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS notifications;

CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v1mc() UNIQUE,
  key SERIAL PRIMARY KEY,
  verified BOOLEAN DEFAULT FALSE,
  email VARCHAR NOT NULL UNIQUE,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  password VARCHAR NOT NULL UNIQUE,
  startDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY'),
  endDate TEXT,
  token VARCHAR UNIQUE,
  collapseSideNav BOOLEAN DEFAULT FALSE,
  isGod BOOLEAN DEFAULT FALSE
);

CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  read BOOLEAN DEFAULT false,
  deleted BOOLEAN DEFAULT false,
  subscriber VARCHAR,
  messageDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY HH12:MI AM'),
  message TEXT
);

CREATE TABLE plans (
  id UUID DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR DEFAULT 'suspended',
  planName VARCHAR NOT NULL,
  amount DECIMAL(12,2),
  setupFee DECIMAL(12,2),
  billEvery VARCHAR,
  trialPeriod VARCHAR,
  subscribers INTEGER
);

CREATE TABLE promotionals (
  id UUID DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR DEFAULT 'inactive',
  planName VARCHAR NOT NULL,
  promoCode VARCHAR NOT NULL,
  amount VARCHAR,
  startDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY'),
  validFor TEXT NOT NULL,
  maxUsage INTEGER,
  totalUsage INTEGER
);

CREATE TABLE plans (
  id UUID DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR DEFAULT 'suspended',
  planName VARCHAR NOT NULL,
  amount DECIMAL(12,2),
  setupFee DECIMAL(12,2),
  billEvery VARCHAR,
  trialPeriod VARCHAR,
  subscribers INTEGER
);

CREATE TABLE subscribers (
  id UUID DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR DEFAULT 'inactive',
  email VARCHAR,
  subscriber VARCHAR NOT NULL,
  password VARCHAR,
  phone VARCHAR,
  planName VARCHAR,
  startDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY'),
  endDate TEXT,
  amount DECIMAL(12,2),
  isGod BOOLEAN DEFAULT FALSE,
)

CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR,
  invoice UUID DEFAULT uuid_generate_v1mc(),
  planName VARCHAR NOT NULL,
  subscriber VARCHAR NOT NULL,
  processor VARCHAR NOT NULL,
  amount VARCHAR,
  chargeDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY'),
  refundDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY')
);
