module.exports = app => {
  const { db, query: { createNewUser, findUserByEmail, verifyEmail } } = app.database;
  const { createRandomToken } = app.shared.helpers;
  const bcrypt = app.get("bcrypt");

  const userTableOptions = `(
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
  )`

  const planTableOptions = `(
    id VARCHAR(36) DEFAULT uuid_generate_v1mc(),
    key SERIAL PRIMARY KEY,
    userid VARCHAR(36) NOT NULL,
    status VARCHAR(20) DEFAULT 'suspended',
    planName VARCHAR(40) NOT NULL,
    amount DECIMAL(12,2),
    setupFee DECIMAL(12,2),
    billEvery VARCHAR(10),
    trialPeriod VARCHAR(10),
    subscribers INTEGER
  )`;

  const subTableOptions = `(
    id UUID DEFAULT uuid_generate_v1mc(),
    key SERIAL PRIMARY KEY,
    userid VARCHAR(36) NOT NULL,
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
  )`;

  const promoTableOptions = `(
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
  )`;

  const transTableOptions = `(
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
  )`;

  const noteTableOptions = `(
    id VARCHAR(36) DEFAULT uuid_generate_v1mc(),
    key SERIAL PRIMARY KEY,
    userid VARCHAR(36) NOT NULL,
    read BOOLEAN DEFAULT false,
    deleted BOOLEAN DEFAULT false,
    subscriber VARCHAR,
    messageDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY HH12:MI AM'),
    message TEXT
  )`;

  const noteProperties = `(userid, subscriber, message, read)`;
  const planProperties = `(userid, status, planName, amount, setupFee, billEvery, trialPeriod, subscribers)`;
  const promoProperties = `(userid, status, planName, promoCode, amount, validFor, maxUsage, totalUsage)`;
  const subProperties = `(userid, status, email, subscriber, password, phone, plan, endDate, amount)`;
  const transProperties = `(userid, status, planName, subscriber, processor, amount)`;

  const planValues = userid => (`
  ('${userid}', 'active', 'Carlotta Prime', 99.99, 0.00, '30 days', '30 days', 299),
  ('${userid}', 'active', 'Carlotta Switch', 49.99, 0.00, '30 days', '30 days', 85),
  ('${userid}', 'active', 'Carlotta Corp', 299.99, 4.99, '30 days', '30 days', 35048),
  ('${userid}', 'active', 'Carlotta Inc.', 1999.99, 399.99, '30 days', '30 days', 14058),
  ('${userid}', 'active', 'Carlotta LLC', 499.99, 299.99, '30 days', '30 days', 11),
  ('${userid}', 'active', 'Carlotta Dealership', 699.99, 24.99, '30 days', '30 days', 400),
  ('${userid}', 'active', 'Carlotta Affiliates', 79.99, 9.99, '30 days', '30 days', 29),
  ('${userid}', 'active', 'Carlotta Sales', 9.99, 0.00, '30 days', '30 days', 642),
  ('${userid}', 'active', 'Carlotta Automechs', 14.99, 249.99, '30 days', '30 days', 22),
  ('${userid}', 'active', 'Carlotta Solar', 44.99, 199.99, '30 days', '30 days', 751),
  ('${userid}', 'active', 'Carlotta Twitch', 4.99, 0.00, '30 days', '30 days', 256),
  ('${userid}', 'active', 'Carlotta Youtube', 1.99, 0.00, '30 days', '30 days', 81),
  ('${userid}', 'suspended', 'Carlotta .com', 69.99, 0.00, '30 days', '30 days', 23),
  ('${userid}', 'suspended', 'Carlotta Partners', 99.99, 0.00, '30 days', '30 days', 214),
  ('${userid}', 'suspended', 'Carlotta Church', 0.00, 0.00, '30 days', '30 days', 845),
  ('${userid}', 'suspended', 'Carlotta Industries', 149.99, 29.99, '30 days', '30 days', 6514),
  ('${userid}', 'suspended', 'Carlotta Workshops', 39.99, 5.99, '30 days', '30 days', 742),
  ('${userid}', 'suspended', 'Carlotta Sports', 19.99, 0.00, '30 days', '30 days', 611),
  ('${userid}', 'suspended', 'Carlotta Cars Magazine', 2.99, 0.00, '30 days', '30 days', 125862),
  ('${userid}', 'suspended', 'Carlotta Flagships', 18.99, 0.00, '30 days', '30 days', 125),
  ('${userid}', 'suspended', 'Carlotta Protocols', 15.99, 0.00, '30 days', '30 days', 487),
  ('${userid}', 'suspended', 'Carlotta ISP', 89.99, 99.90, '30 days', '30 days', 329),
  ('${userid}', 'suspended', 'Carlotta Pumps', 279.99, 198.89, '30 days', '30 days', 4),
  ('${userid}', 'suspended', 'Carlotta Assoc.', 69.99, 0.00, '30 days', '30 days', 645);
  `);

  const promoValues = userid => (`
  ('${userid}', 'active', 'Carlotta Prime', 'FIRST10KACCOUNTS', '5%', '30 days', 10000, 299),
  ('${userid}', 'active', 'Carlotta Prime', '10PERCENTOFF', '10%', '30 days', 100, 85),
  ('${userid}', 'active', 'Carlotta Dealership', 'FALLBACKSALE', '15%', '30 days', 200, 48),
  ('${userid}', 'active', 'Carlotta Twitch', 'EVERYLOWPRICES', '20%', '30 days', 100, 51),
  ('${userid}', 'active', 'Carlotta Solar', 'MILITARYDISCOUNT', '25%', '30 days', 50, 11),
  ('${userid}', 'active', 'Carlotta Prime', '30PERCENTOFF', '30%', '30 days', 1000, 400),
  ('${userid}', 'active', 'Carlotta Sales', 'SPRINGSALE', '50%', '30 days', 30, 29),
  ('${userid}', 'active', 'Carlotta Prime', '60PERCENTOFF', '60%', '30 days', 50, 42),
  ('${userid}', 'active', 'Carlotta Switch', '70PERCENTOFF', '70%', '30 days', 20, 19),
  ('${userid}', 'active', 'Carlotta Prime', '80PERCENTOFF', '80%', '30 days', 10, 1),
  ('${userid}', 'active', 'Carlotta Youtube', '90PERCENTOFF', '90%', '30 days', 10, 6),
  ('${userid}', 'active', 'Carlotta Prime', 'FREETRIAL', '100%', '30 days', 99999999, 81),
  ('${userid}', 'suspended', 'Carlotta .com', 'FREETRIALOFFER', '100%', '30 days', 20, 20),
  ('${userid}', 'suspended', 'Carlotta Partners', 'XCLUSIVECLUB', '$20.00', '30 days', 500, 214),
  ('${userid}', 'suspended', 'Carlotta Church', '4CHARITY', '100%', '30 days', 1000, 845),
  ('${userid}', 'suspended', 'Carlotta Industries', 'HARDWORKENVBENEFITS', '$200.00', '30 days', 1000, 514),
  ('${userid}', 'suspended', 'Carlotta Workshops', 'WORKXSHOPPE', '10%', '30 days', 100, 74),
  ('${userid}', 'suspended', 'Carlotta Sports', 'GETAWORKOUT', '20%', '30 days', 20, 11),
  ('${userid}', 'suspended', 'Carlotta Cars Magazine', '1FREECARMAGZ', '$2.00', '30 days', 100, 62),
  ('${userid}', 'suspended', 'Carlotta Flagships', '20PERCENTOFF', '20%', '30 days', 125, 125),
  ('${userid}', 'suspended', 'Carlotta Protocols', 'FOLLOWGUIDELINES', '$5.00', '30 days', 500, 487),
  ('${userid}', 'suspended', 'Carlotta ISP', 'SIGNMEUP', '$10.00', '30 days', 328, 328),
  ('${userid}', 'suspended', 'Carlotta Pumps', '1FREEPUMP', '$100.00', '30 days', 5, 4),
  ('${userid}', 'suspended', 'Carlotta Assoc.', 'ASSOCIATED', '$100.00', '30 days', 10, 5);
  `);

  const subValues = userid => (`
  ('${userid}', 'active', 'admin@admin.com', 'Admin', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('${userid}', 'active', 'squatters@gmail.com', 'Sherry Waters', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('${userid}', 'active', 'bob-eh@sap.com', 'Bob Aronssen', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('${userid}', 'active', 'shani.smith@hotmail.com', 'Shaniqua Smith', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('${userid}', 'active', 'tanyaballschin@gmail.com', 'Tanya Ballschin', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('${userid}', 'active', 'lukeskywalker@rebelforce.com', 'Siemen Walker', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('${userid}', 'active', 'jTank@aol.com', 'Jenny Tanks', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('${userid}', 'active', 'amberLamps@yahoo.com', 'Amber Lalampas', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('${userid}', 'active', 'kylebTeegue@gmail.com', 'Kyle Teegue', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('${userid}', 'active', 'snakePiliskin@gmail.com', 'Gary Pilkinson', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('${userid}', 'active', 'yasminRod@hotmail.com', 'Yasmin Rodrigues', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('${userid}', 'active', 'adaDamn@photonmail.com', 'Adam Johnson', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  ('${userid}', 'inactive', 'carlsagan42@yahoo.com', 'Carl Sagan', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 3, 2018', 29.99),
  ('${userid}', 'inactive', 'seamark@outlook.com', 'Mark Canelo', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 12, 2018', 29.99),
  ('${userid}', 'suspended', 'axxll@manjaro.com', 'Axle Root', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 16, 2018', 29.99),
  ('${userid}', 'inactive', 'vicksAdam@sap.com', 'Adamn Vicks', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99),
  ('${userid}', 'inactive', 'wallyworld@manjaro.com', 'Wes Walls', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99),
  ('${userid}', 'suspended', 'kellyUll@gmail.com', 'Kelly Ullman', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99),
  ('${userid}', 'inactive', 'oatesA@aol.com', 'Adam Oates', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99),
  ('${userid}', 'suspended', 'scottParker@jaro.com', 'Scott Parker', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 21, 2018', 29.99),
  ('${userid}', 'suspended', 'asmLossenger@mancusco.com', 'Emily Loz', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 22, 2018', 29.99),
  ('${userid}', 'inactive', 'pparks@akins.com', 'Parker Posey', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 29, 2018', 29.99),
  ('${userid}', 'suspended', 'aleashtrails@kilmas.com', 'Alisha Tallis', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 29, 2018', 29.99),
  ('${userid}', 'suspended', '88Damon@photonmail.com', 'Damien Smith', 'password', '(555) 555-5555', 'Carlotta Prime', 'Jan 29, 2018', 29.99);
  `);

  const transValues = userid => (`
  ('${userid}', 'paid', 'Carlotta Prime', 'Sherry Waters', 'Paypal', 29.99),
  ('${userid}', 'due', 'Carlotta Prime', 'Parker Posey', '', 29.99),
  ('${userid}', 'paid', 'Carlotta Prime', 'Bob Aronssen', 'Venmo', 29.99),
  ('${userid}', 'paid', 'Carlotta Prime', 'Shaniqua Smith', 'Stripe', 29.99),
  ('${userid}', 'paid', 'Carlotta Prime', 'Tanya Ballschin', 'Stripe', 29.99),
  ('${userid}', 'due', 'Carlotta Prime', 'Adam Oates', '', 29.99),
  ('${userid}', 'due', 'Carlotta Prime', 'Wes Walls', '', 29.99),
  ('${userid}', 'paid', 'Carlotta Prime', 'Siemen Walker', 'Visa Checkout', 29.99),
  ('${userid}', 'paid', 'Carlotta Prime', 'Jenny Tanks', 'Stripe', 29.99),
  ('${userid}', 'due', 'Carlotta Prime', 'Adamn Vicks', '', 29.99),
  ('${userid}', 'due', 'Carlotta Prime', 'Mark Canelo', '', 29.99),
  ('${userid}', 'paid', 'Carlotta Prime', 'Amber Lalampas', 'Paypal', 29.99),
  ('${userid}', 'refund', 'Carlotta Prime', 'Mark Canelo', 'Paypal', 29.99),
  ('${userid}', 'refund', 'Carlotta Prime', 'Axle Root', 'Stripe', 29.99),
  ('${userid}', 'refund', 'Carlotta Prime', 'Gary Pilkinson', 'Venmo', 29.99),
  ('${userid}', 'credit', 'Carlotta Prime', 'Kelly Ullman', '', 29.99),
  ('${userid}', 'refund', 'Carlotta Prime', 'Yasmin Rodrigues', 'Stripe', 29.99),
  ('${userid}', 'credit', 'Carlotta Prime', 'Adam Oates', '', 29.99),
  ('${userid}', 'credit', 'Carlotta Prime', 'Wes Walls', '', 29.99),
  ('${userid}', 'credit', 'Carlotta Prime', 'Kyle Teegue', '', 29.99),
  ('${userid}', 'refund', 'Carlotta Prime', 'Alisha Tallis', 'Stripe', 29.99),
  ('${userid}', 'credit', 'Carlotta Prime', 'Scott Parker', '', 29.99),
  ('${userid}', 'refund', 'Carlotta Prime', 'Emily Voz', 'Visa Checkout', 29.99),
  ('${userid}', 'refund', 'Carlotta Prime', 'Carl Sagan', 'Paypal', 29.99);
  `);

  const noteValues = userid => (`
  ('${userid}', 'Sherry Waters', 'has been added to the Carlotta Corp gateway.', false),
  ('${userid}', 'Carl Sagan', 'has cancelled his membership to the Carlotta Prime plan.', false),
  ('${userid}', 'Parker Posey', 'is late to pay for the Carlotta Prime plan.', false),
  ('${userid}', 'Bob Aronssen', 'has been succesfully charged for the Carlotta Prime membership!', false),
  ('${userid}', 'Axle Root', 'has been suspended due to non-payment', true),
  ('${userid}', 'Shaniqua Smith', 'has been succesfully charged for the Carlotta Primer membership!', true),
  ('${userid}', 'Adam Vicks', 'has parked his membership and is now an inactive subscriber', true);
  `);

  (async () => {
    try {
      // create DB tables
      await db.none(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS subscribers;
        DROP TABLE IF EXISTS plans;
        DROP TABLE IF EXISTS promotionals;
        DROP TABLE IF EXISTS transactions;
        DROP TABLE IF EXISTS notifications;
        CREATE TABLE users ${userTableOptions};
        CREATE TABLE subscribers ${subTableOptions};
        CREATE TABLE plans ${planTableOptions};
        CREATE TABLE promotionals ${promoTableOptions};
        CREATE TABLE transactions ${transTableOptions};
        CREATE TABLE notifications ${noteTableOptions};
      `);

      // create new user
      const token = createRandomToken(); // a token used for email verification
      try {
        const newPassword = await bcrypt.hash('password123', 12) // hash password before attempting to create the user
        await db.none(createNewUser(),['betatester@subskribble.com', newPassword, 'Beta', 'Tester', token])
      } catch (err) { return console.log('\n--[ERROR]-- Seed FAILED to creat a new user! Process has been terminated.'); }

      // get newly created user info
      const existingUser = await db.oneOrNone(findUserByEmail(), ['betatester@subskribble.com']);
      if (!existingUser) { return console.log('\n--[ERROR]-- Seed FAILED to find the newly created user! Process has been terminated.'); }

      // verify newly created user's email
      await db.none(verifyEmail(), [existingUser.email]);

      // seed DB with newly created user details
      await db.none(`
        INSERT INTO subscribers ${subProperties} VALUES ${subValues(existingUser.id)};
        INSERT INTO plans ${planProperties} VALUES ${planValues(existingUser.id)};
        INSERT INTO promotionals ${promoProperties} VALUES ${promoValues(existingUser.id)};
        INSERT INTO transactions ${transProperties} VALUES ${transValues(existingUser.id)};
        INSERT INTO notifications ${noteProperties} VALUES ${noteValues(existingUser.id)};
      `)

      console.log('--[SUCCESS]-- Seeded database!');
    } catch (err) { console.log('--[ERROR]-- ', err.toString());
    } finally { process.exit(0); }
  })();
}
