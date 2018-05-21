DROP DATABASE IF EXISTS "subskribble-demo";
CREATE DATABASE "subskribble-demo";

\c subskribble-demo;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- DROP TABLE IF EXISTS subscribers;
-- DROP TABLE IF EXISTS plans;
-- DROP TABLE IF EXISTS promotionals;
-- DROP TABLE IF EXISTS transactions;
-- DROP TABLE IF EXISTS notifications;

CREATE TABLE users (
  id VARCHAR(36) DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  verified BOOLEAN DEFAULT FALSE,
  email VARCHAR,
  firstName TEXT,
  lastName TEXT,
  password VARCHAR NOT NULL UNIQUE,
  startDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY'),
  endDate TEXT,
  token VARCHAR(32),
  isGod BOOLEAN DEFAULT FALSE
);

CREATE TABLE subscribers (
  id VARCHAR(36) DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  userid VARCHAR(36) NOT NULL,
  status VARCHAR(20) DEFAULT 'inactive',
  email VARCHAR,
  subscriber VARCHAR NOT NULL,
  phone VARCHAR,
  plan VARCHAR,
  startDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY'),
  endDate TEXT,
  amount DECIMAL(12,2)
);

CREATE TABLE plans (
  id VARCHAR(36) DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  userid VARCHAR(36) NOT NULL,
  status VARCHAR(20) DEFAULT 'inactive',
  planName VARCHAR(40) NOT NULL,
  amount DECIMAL(12,2),
  setupFee DECIMAL(12,2),
  billEvery VARCHAR(10),
  trialPeriod VARCHAR(10),
  subscribers INTEGER
);

CREATE TABLE promotionals (
  id VARCHAR(36) DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  userid VARCHAR(36) NOT NULL,
  status VARCHAR(20) DEFAULT 'inactive',
  planName VARCHAR(40) NOT NULL,
  promoCode VARCHAR(40) NOT NULL,
  amount VARCHAR(12),
  startDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY'),
  validFor TEXT NOT NULL,
  maxUsage INTEGER,
  totalUsage INTEGER
);

CREATE TABLE transactions (
  id VARCHAR(36) DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  userid VARCHAR(36) NOT NULL,
  status VARCHAR(20),
  invoice UUID DEFAULT uuid_generate_v1mc(),
  planName VARCHAR(40) NOT NULL,
  subscriber VARCHAR NOT NULL,
  processor VARCHAR(40) NOT NULL,
  amount VARCHAR(12),
  chargeDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY'),
  refundDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY')
);

CREATE TABLE notifications (
  id VARCHAR(36) DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  userid VARCHAR(36) NOT NULL,
  read BOOLEAN DEFAULT false,
  deleted BOOLEAN DEFAULT false,
  subscriber VARCHAR,
  messageDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY HH12:MI AM'),
  message TEXT
);
