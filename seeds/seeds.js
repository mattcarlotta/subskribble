module.exports = app => {
  const { db, query: { createNewUser, findUserByEmail, verifyEmail, setUserAsAdmin } } = app.database;
  const { createRandomToken } = app.shared.helpers;
  const bcrypt = app.get("bcrypt");

  const userTableOptions = `(
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
  )`

  const noteTableOptions = `(
    id UUID DEFAULT uuid_generate_v1mc(),
    key SERIAL PRIMARY KEY,
    userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    read BOOLEAN DEFAULT false,
    deleted BOOLEAN DEFAULT false,
    subscriber VARCHAR,
    messageDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY HH12:MI AM'),
    message TEXT
  )`;

  const planTableOptions = `(
    id UUID DEFAULT uuid_generate_v1mc(),
    key SERIAL PRIMARY KEY,
    userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR DEFAULT 'active',
    planName VARCHAR NOT NULL UNIQUE,
    amount DECIMAL(12,2) NOT NULL,
    setupFee DECIMAL(12,2) DEFAULT 0.00,
    billEvery VARCHAR DEFAULT '30 Days',
    trialPeriod VARCHAR DEFAULT '0 Days',
    subscribers INTEGER DEFAULT 0
  )`;

  const promoTableOptions = `(
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
  )`;

  const subformTableOptions = `(
    id UUID DEFAULT uuid_generate_v1mc(),
    key SERIAL PRIMARY KEY,
    userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR DEFAULT 'active',
    formName VARCHAR UNIQUE,
    uniqueFormName VARCHAR UNIQUE,
    plans TEXT ARRAY NOT NULL
  )`;

  const subTableOptions = `(
    id UUID DEFAULT uuid_generate_v1mc(),
    key SERIAL PRIMARY KEY,
    userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR DEFAULT 'active',
    email VARCHAR UNIQUE,
    subscriber VARCHAR NOT NULL,
    planName VARCHAR NOT NULL,
    amount DECIMAL(12,2),
    phone VARCHAR,
    address TEXT,
    addressCity TEXT,
    addressState TEXT,
    addressZip TEXT,
    startDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY'),
    endDate TEXT,
    isGod BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (planName) REFERENCES plans(planName) ON DELETE CASCADE
  )`;

  const transTableOptions = `(
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
  )`;

  const noteProperties = `(userid, subscriber, message, read)`;
  const planProperties = `(userid, status, planName, amount, setupFee, billEvery, trialPeriod, subscribers)`;
  const promoProperties = `(userid, status, planName, promoCode, amount, validFor, maxUsage, totalUsage)`;
  const subProperties = `(userid, status, email, subscriber, phone, planName, endDate, amount)`;
  const subformProperties = `(userid, status, formName, uniqueFormName, plans)`
  const transProperties = `(userid, status, planName, subscriber, processor, amount)`;
  const selectUserid = id => (`(SELECT id FROM users WHERE id='${id}')`);

  const planValues = id => (`
  (${selectUserid(id)}, 'active', 'Carlotta Prime', 99.99, 0.00, '30 days', '30 days', 299),
  (${selectUserid(id)}, 'active', 'Carlotta Switch', 49.99, 0.00, '30 days', '30 days', 85),
  (${selectUserid(id)}, 'active', 'Carlotta Corp', 299.99, 4.99, '30 days', '30 days', 35048),
  (${selectUserid(id)}, 'active', 'Carlotta Inc.', 1999.99, 399.99, '30 days', '30 days', 14058),
  (${selectUserid(id)}, 'active', 'Carlotta LLC', 499.99, 299.99, '30 days', '30 days', 11),
  (${selectUserid(id)}, 'active', 'Carlotta Dealership', 699.99, 24.99, '30 days', '30 days', 400),
  (${selectUserid(id)}, 'active', 'Carlotta Affiliates', 79.99, 9.99, '30 days', '30 days', 29),
  (${selectUserid(id)}, 'active', 'Carlotta Sales', 9.99, 0.00, '30 days', '30 days', 642),
  (${selectUserid(id)}, 'active', 'Carlotta Automechs', 14.99, 249.99, '30 days', '30 days', 22),
  (${selectUserid(id)}, 'active', 'Carlotta Solar', 44.99, 199.99, '30 days', '30 days', 751),
  (${selectUserid(id)}, 'active', 'Carlotta Twitch', 4.99, 0.00, '30 days', '30 days', 256),
  (${selectUserid(id)}, 'active', 'Carlotta Youtube', 1.99, 0.00, '30 days', '30 days', 81),
  (${selectUserid(id)}, 'suspended', 'Carlotta .com', 69.99, 0.00, '30 days', '30 days', 23),
  (${selectUserid(id)}, 'suspended', 'Carlotta Partners', 99.99, 0.00, '30 days', '30 days', 214),
  (${selectUserid(id)}, 'suspended', 'Carlotta Church', 0.00, 0.00, '30 days', '30 days', 845),
  (${selectUserid(id)}, 'suspended', 'Carlotta Industries', 149.99, 29.99, '30 days', '30 days', 6514),
  (${selectUserid(id)}, 'suspended', 'Carlotta Workshops', 39.99, 5.99, '30 days', '30 days', 742),
  (${selectUserid(id)}, 'suspended', 'Carlotta Sports', 19.99, 0.00, '30 days', '30 days', 611),
  (${selectUserid(id)}, 'suspended', 'Carlotta Cars Magazine', 2.99, 0.00, '30 days', '30 days', 125862),
  (${selectUserid(id)}, 'suspended', 'Carlotta Flagships', 18.99, 0.00, '30 days', '30 days', 125),
  (${selectUserid(id)}, 'suspended', 'Carlotta Protocols', 15.99, 0.00, '30 days', '30 days', 487),
  (${selectUserid(id)}, 'suspended', 'Carlotta ISP', 89.99, 99.90, '30 days', '30 days', 329),
  (${selectUserid(id)}, 'suspended', 'Carlotta Pumps', 279.99, 198.89, '30 days', '30 days', 4),
  (${selectUserid(id)}, 'suspended', 'Carlotta Assoc.', 69.99, 0.00, '30 days', '30 days', 645);
  `);

  const promoValues = id => (`
  (${selectUserid(id)}, 'active', 'Carlotta Prime', 'FIRST10KACCOUNTS', '5%', '30 days', 10000, 299),
  (${selectUserid(id)}, 'active', 'Carlotta Prime', '10PERCENTOFF', '10%', '30 days', 100, 85),
  (${selectUserid(id)}, 'active', 'Carlotta Dealership', 'FALLBACKSALE', '15%', '30 days', 200, 48),
  (${selectUserid(id)}, 'active', 'Carlotta Twitch', 'EVERYLOWPRICES', '20%', '30 days', 100, 51),
  (${selectUserid(id)}, 'active', 'Carlotta Solar', 'MILITARYDISCOUNT', '25%', '30 days', 50, 11),
  (${selectUserid(id)}, 'active', 'Carlotta Prime', '30PERCENTOFF', '30%', '30 days', 1000, 400),
  (${selectUserid(id)}, 'active', 'Carlotta Sales', 'SPRINGSALE', '50%', '30 days', 30, 29),
  (${selectUserid(id)}, 'active', 'Carlotta Prime', '60PERCENTOFF', '60%', '30 days', 50, 42),
  (${selectUserid(id)}, 'active', 'Carlotta Switch', '70PERCENTOFF', '70%', '30 days', 20, 19),
  (${selectUserid(id)}, 'active', 'Carlotta Prime', '80PERCENTOFF', '80%', '30 days', 10, 1),
  (${selectUserid(id)}, 'active', 'Carlotta Youtube', '90PERCENTOFF', '90%', '30 days', 10, 6),
  (${selectUserid(id)}, 'active', 'Carlotta Prime', 'FREETRIAL', '100%', '30 days', 99999999, 81),
  (${selectUserid(id)}, 'suspended', 'Carlotta .com', 'FREETRIALOFFER', '100%', '30 days', 20, 20),
  (${selectUserid(id)}, 'suspended', 'Carlotta Partners', 'XCLUSIVECLUB', '$20.00', '30 days', 500, 214),
  (${selectUserid(id)}, 'suspended', 'Carlotta Church', '4CHARITY', '100%', '30 days', 1000, 845),
  (${selectUserid(id)}, 'suspended', 'Carlotta Industries', 'HARDWORKENVBENEFITS', '$200.00', '30 days', 1000, 514),
  (${selectUserid(id)}, 'suspended', 'Carlotta Workshops', 'WORKXSHOPPE', '10%', '30 days', 100, 74),
  (${selectUserid(id)}, 'suspended', 'Carlotta Sports', 'GETAWORKOUT', '20%', '30 days', 20, 11),
  (${selectUserid(id)}, 'suspended', 'Carlotta Cars Magazine', '1FREECARMAGZ', '$2.00', '30 days', 100, 62),
  (${selectUserid(id)}, 'suspended', 'Carlotta Flagships', '20PERCENTOFF', '20%', '30 days', 125, 125),
  (${selectUserid(id)}, 'suspended', 'Carlotta Protocols', 'FOLLOWGUIDELINES', '$5.00', '30 days', 500, 487),
  (${selectUserid(id)}, 'suspended', 'Carlotta ISP', 'SIGNMEUP', '$10.00', '30 days', 328, 328),
  (${selectUserid(id)}, 'suspended', 'Carlotta Pumps', '1FREEPUMP', '$100.00', '30 days', 5, 4),
  (${selectUserid(id)}, 'suspended', 'Carlotta Assoc.', 'ASSOCIATED', '$100.00', '30 days', 10, 5);
  `);

  const subformValues = id => (`
  (${selectUserid(id)}, 'active', 'Partners Form', 'partners-form', ARRAY ['Carlotta Dealership', 'Carlotta Prime', 'Carlotta Sales', 'Carlotta Youtube']),
  (${selectUserid(id)}, 'active', 'Affiliates Form', 'affiliates-form', ARRAY ['Carlotta Prime', 'Carlotta Dealership', 'Carlotta Solar'] ),
  (${selectUserid(id)}, 'active', 'Subscriber Form', 'subscriber-form', ARRAY ['Carlotta Prime']),
  (${selectUserid(id)}, 'active', 'Employee Form', 'employee-form', ARRAY ['Carlotta Corp']),
  (${selectUserid(id)}, 'suspended', 'General Newsletter Form', 'general-newsletter-form', ARRAY ['Carlotta Cars Magazine', 'Carlotta Sports']),
  (${selectUserid(id)}, 'suspended', 'Flagships Form', 'flagships-form', ARRAY ['Carlotta Flashships'] ),
  (${selectUserid(id)}, 'suspended', 'Billing ISP Form', 'billing-isp-form', ARRAY ['Carlotta ISP']),
  (${selectUserid(id)}, 'suspended', 'Billing Cars Form', 'billing-cars-form', ARRAY ['Carlotta Cars Magazine']);
  `)

  const subValues = id => (`
  (${selectUserid(id)}, 'active', 'admin@admin.com', 'Admin', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  (${selectUserid(id)}, 'active', 'squatters@gmail.com', 'Sherry Waters', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  (${selectUserid(id)}, 'active', 'bob-eh@sap.com', 'Bob Aronssen', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  (${selectUserid(id)}, 'active', 'shani.smith@hotmail.com', 'Shaniqua Smith', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  (${selectUserid(id)}, 'active', 'tanyaballschin@gmail.com', 'Tanya Ballschin', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  (${selectUserid(id)}, 'active', 'lukeskywalker@rebelforce.com', 'Siemen Walker', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  (${selectUserid(id)}, 'active', 'jTank@aol.com', 'Jenny Tanks', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  (${selectUserid(id)}, 'active', 'amberLamps@yahoo.com', 'Amber Lalampas', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  (${selectUserid(id)}, 'active', 'kylebTeegue@gmail.com', 'Kyle Teegue', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  (${selectUserid(id)}, 'active', 'snakePiliskin@gmail.com', 'Gary Pilkinson', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  (${selectUserid(id)}, 'active', 'yasminRod@hotmail.com', 'Yasmin Rodrigues', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  (${selectUserid(id)}, 'active', 'adaDamn@photonmail.com', 'Adam Johnson', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
  (${selectUserid(id)}, 'inactive', 'carlsagan42@yahoo.com', 'Carl Sagan', '(555) 555-555', 'Carlotta Prime', 'Jan 3, 2018', 29.99),
  (${selectUserid(id)}, 'inactive', 'seamark@outlook.com', 'Mark Canelo', '(555) 555-555', 'Carlotta Prime', 'Jan 12, 2018', 29.99),
  (${selectUserid(id)}, 'suspended', 'axxll@manjaro.com', 'Axle Root', '(555) 555-555', 'Carlotta Prime', 'Jan 16, 2018', 29.99),
  (${selectUserid(id)}, 'inactive', 'vicksAdam@sap.com', 'Adamn Vicks', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99),
  (${selectUserid(id)}, 'inactive', 'wallyworld@manjaro.com', 'Wes Walls', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99),
  (${selectUserid(id)}, 'suspended', 'kellyUll@gmail.com', 'Kelly Ullman', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99),
  (${selectUserid(id)}, 'inactive', 'oatesA@aol.com', 'Adam Oates', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99),
  (${selectUserid(id)}, 'suspended', 'scottParker@jaro.com', 'Scott Parker', '(555) 555-555', 'Carlotta Prime', 'Jan 21, 2018', 29.99),
  (${selectUserid(id)}, 'suspended', 'asmLossenger@mancusco.com', 'Emily Loz', '(555) 555-555', 'Carlotta Prime', 'Jan 22, 2018', 29.99),
  (${selectUserid(id)}, 'inactive', 'pparks@akins.com', 'Parker Posey', '(555) 555-555', 'Carlotta Prime', 'Jan 29, 2018', 29.99),
  (${selectUserid(id)}, 'suspended', 'aleashtrails@kilmas.com', 'Alisha Tallis', '(555) 555-555', 'Carlotta Prime', 'Jan 29, 2018', 29.99),
  (${selectUserid(id)}, 'suspended', '88Damon@photonmail.com', 'Damien Smith', '(555) 555-5555', 'Carlotta Prime', 'Jan 29, 2018', 29.99);
  `);


  const transValues = id => (`
  (${selectUserid(id)}, 'paid', 'Carlotta Prime', 'Sherry Waters', 'Paypal', 29.99),
  (${selectUserid(id)}, 'due', 'Carlotta Prime', 'Parker Posey', '', 29.99),
  (${selectUserid(id)}, 'paid', 'Carlotta Prime', 'Bob Aronssen', 'Venmo', 29.99),
  (${selectUserid(id)}, 'paid', 'Carlotta Prime', 'Shaniqua Smith', 'Stripe', 29.99),
  (${selectUserid(id)}, 'paid', 'Carlotta Prime', 'Tanya Ballschin', 'Stripe', 29.99),
  (${selectUserid(id)}, 'due', 'Carlotta Prime', 'Adam Oates', '', 29.99),
  (${selectUserid(id)}, 'due', 'Carlotta Prime', 'Wes Walls', '', 29.99),
  (${selectUserid(id)}, 'paid', 'Carlotta Prime', 'Siemen Walker', 'Visa Checkout', 29.99),
  (${selectUserid(id)}, 'paid', 'Carlotta Prime', 'Jenny Tanks', 'Stripe', 29.99),
  (${selectUserid(id)}, 'due', 'Carlotta Prime', 'Adamn Vicks', '', 29.99),
  (${selectUserid(id)}, 'due', 'Carlotta Prime', 'Mark Canelo', '', 29.99),
  (${selectUserid(id)}, 'paid', 'Carlotta Prime', 'Amber Lalampas', 'Paypal', 29.99),
  (${selectUserid(id)}, 'refund', 'Carlotta Prime', 'Mark Canelo', 'Paypal', 29.99),
  (${selectUserid(id)}, 'refund', 'Carlotta Prime', 'Axle Root', 'Stripe', 29.99),
  (${selectUserid(id)}, 'refund', 'Carlotta Prime', 'Gary Pilkinson', 'Venmo', 29.99),
  (${selectUserid(id)}, 'credit', 'Carlotta Prime', 'Kelly Ullman', '', 29.99),
  (${selectUserid(id)}, 'refund', 'Carlotta Prime', 'Yasmin Rodrigues', 'Stripe', 29.99),
  (${selectUserid(id)}, 'credit', 'Carlotta Prime', 'Adam Oates', '', 29.99),
  (${selectUserid(id)}, 'credit', 'Carlotta Prime', 'Wes Walls', '', 29.99),
  (${selectUserid(id)}, 'credit', 'Carlotta Prime', 'Kyle Teegue', '', 29.99),
  (${selectUserid(id)}, 'refund', 'Carlotta Prime', 'Alisha Tallis', 'Stripe', 29.99),
  (${selectUserid(id)}, 'credit', 'Carlotta Prime', 'Scott Parker', '', 29.99),
  (${selectUserid(id)}, 'refund', 'Carlotta Prime', 'Emily Voz', 'Visa Checkout', 29.99),
  (${selectUserid(id)}, 'refund', 'Carlotta Prime', 'Carl Sagan', 'Paypal', 29.99);
  `);

  const noteValues = id => (`
  (${selectUserid(id)}, 'Sherry Waters', 'has been added to the Carlotta Corp gateway.', false),
  (${selectUserid(id)}, 'Carl Sagan', 'has cancelled his membership to the Carlotta Prime plan.', false),
  (${selectUserid(id)}, 'Parker Posey', 'is late to pay for the Carlotta Prime plan.', false),
  (${selectUserid(id)}, 'Bob Aronssen', 'has been succesfully charged for the Carlotta Prime membership!', false),
  (${selectUserid(id)}, 'Axle Root', 'has been suspended due to non-payment', true),
  (${selectUserid(id)}, 'Shaniqua Smith', 'has been succesfully charged for the Carlotta Primer membership!', true),
  (${selectUserid(id)}, 'Adam Vicks', 'has parked his membership and is now an inactive subscriber', true);
  `);

  (async () => {
    try {
      // create DB tables
      await db.none(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS subscribers;
        DROP TABLE IF EXISTS plans;
        DROP TABLE IF EXISTS promotionals;
        DROP TABLE IF EXISTS transactions;
        DROP TABLE IF EXISTS forms;
        DROP TABLE IF EXISTS notifications;
        CREATE TABLE users ${userTableOptions};
        CREATE TABLE plans ${planTableOptions};
        CREATE TABLE promotionals ${promoTableOptions};
        CREATE TABLE notifications ${noteTableOptions};
        CREATE TABLE subscribers ${subTableOptions};
        CREATE TABLE forms ${subformTableOptions};
        CREATE TABLE transactions ${transTableOptions};
      `);

      // create new user
      const token = createRandomToken(); // a token used for email verification
      try {
        const newPassword = await bcrypt.hash('password123', 12) // hash password before attempting to create the user
        await db.none(createNewUser(),['betatester@subskribble.com', newPassword, 'Beta', 'Tester', token])
      } catch (err) { return console.log('\n--[ERROR]-- Seed FAILED to create a new user! Process has been terminated.'); }

      // get newly created user info
      const existingUser = await db.oneOrNone(findUserByEmail(), ['betatester@subskribble.com']);
      if (!existingUser) { return console.log('\n--[ERROR]-- Seed FAILED to find the newly created user! Process has been terminated.'); }

      // verify newly created user's email
      await db.none(verifyEmail(), [existingUser.email]);

      // set users as admin
      const { id } = existingUser;
      await db.none(setUserAsAdmin(), [id]);

      // inset fake data into created tables
      await db.none(`
        INSERT INTO plans ${planProperties} VALUES ${planValues(id)};
        INSERT INTO notifications ${noteProperties} VALUES ${noteValues(id)};
        INSERT INTO promotionals ${promoProperties} VALUES ${promoValues(id)};
        INSERT INTO subscribers ${subProperties} VALUES ${subValues(id)};
        INSERT INTO forms ${subformProperties} VALUES ${subformValues(id)};
        INSERT INTO transactions ${transProperties} VALUES ${transValues(id)};
      `)

      console.log('--[SUCCESS]-- Seeded database!');
    } catch (err) { console.log('--[ERROR]-- ', err.toString());
    } finally { process.exit(0); }
  })();
}
