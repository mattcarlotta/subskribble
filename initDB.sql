DROP DATABASE IF EXISTS "subskribble-demo";
CREATE DATABASE "subskribble-demo";

\c subskribble-demo;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS subscribers;
DROP TABLE IF EXISTS plans;
DROP TABLE IF EXISTS promotionals;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS templates;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS avatars;
DROP TABLE IF EXISTS feedback;

CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v1mc() UNIQUE,
  key SERIAL PRIMARY KEY,
  verified BOOLEAN DEFAULT FALSE,
  email VARCHAR NOT NULL UNIQUE,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  password VARCHAR NOT NULL UNIQUE,
  company VARCHAR NOT NULL UNIQUE,
  startDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY'),
  endDate TEXT,
  credit INTEGER DEFAULT 0,
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
  status VARCHAR DEFAULT 'active',
  planName VARCHAR NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  setupFee DECIMAL(12,2),
  billEvery VARCHAR NOT NULL,
  trialPeriod VARCHAR,
  subscribers INTEGER DEFAULT 0
);

CREATE TABLE promotionals (
  id UUID DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR DEFAULT 'active',
  plans TEXT ARRAY NOT NULL,
  promoCode VARCHAR NOT NULL,
  amount INTEGER NOT NULL,
  discountType VARCHAR NOT NULL,
  datestamps TEXT ARRAY NOT NULL,
  startDate TEXT NOT NULL,
  endDate TEXT NOT NULL,
  maxUsage INTEGER NOT NULL,
  totalUsage INTEGER DEFAULT 0
);

CREATE TABLE subscribers (
  id UUID DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR DEFAULT 'active',
  email VARCHAR,
  subscriber VARCHAR NOT NULL,
  planName VARCHAR NOT NULL,
  amount DECIMAL(12,2),
  billingAddress TEXT,
  billingCity TEXT,
  billingState TEXT,
  billingUnit TEXT,
  billingZip TEXT,
  contactAddress TEXT,
  contactCity TEXT,
  contactState TEXT,
  contactUnit TEXT,
  contactZip TEXT,
  contactPhone VARCHAR,
  promoCode TEXT,
  sameBillingAddress BOOLEAN,
  startDate TEXT NOT NULL,
  endDate TEXT
);

CREATE TABLE templates (
  id UUID DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR DEFAULT 'active',
  fromSender VARCHAR NOT NULL,
  subject VARCHAR NOT NULL,
  templateName VARCHAR UNIQUE,
  uniqueTemplateName VARCHAR UNIQUE,
  message TEXT NOT NULL,
  plans TEXT ARRAY NOT NULL
);

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
  chargeDate TEXT,
  refundDate TEXT
);

CREATE TABLE feedback (
  id UUID DEFAULT uuid_generate_v1mc(),
  key SERIAL PRIMARY KEY,
  company VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  reason TEXT
);

CREATE TABLE avatars (
  userid UUID NOT NULL,
  key SERIAL PRIMARY KEY,
  avatarURL TEXT DEFAULT NULL,
  avatarFilePath TEXT DEFAULT NULL,
  token VARCHAR UNIQUE
);
