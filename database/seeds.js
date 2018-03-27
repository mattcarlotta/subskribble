module.exports = app => {
  const { db } = app.database;

  const planTableOptions = `(
    id VARCHAR(36) DEFAULT uuid_generate_v1mc(),
    key SERIAL PRIMARY KEY,
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
    read BOOLEAN DEFAULT false,
    deleted BOOLEAN DEFAULT false,
    subscriber VARCHAR NOT NULL,
    messageDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY HH24:MI:SS'),
    message TEXT
  )`;

  const noteProperties = `(subscriber, message, read)`;
  const planProperties = `(status, planName, amount, setupFee, billEvery, trialPeriod, subscribers)`;
  const promoProperties = `(status, planName, promoCode, amount, validFor, maxUsage, totalUsage)`;
  const subProperties = `(status, email, subscriber, password, phone, plan, endDate, amount)`;
  const transProperties = `(status, planName, subscriber, processor, amount)`;

  const planValues = `
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
  ('suspended', 'Carlotta .com', 69.99, 0.00, '30 days', '30 days', 23),
  ('suspended', 'Carlotta Partners', 99.99, 0.00, '30 days', '30 days', 214),
  ('suspended', 'Carlotta Church', 0.00, 0.00, '30 days', '30 days', 845),
  ('suspended', 'Carlotta Industries', 149.99, 29.99, '30 days', '30 days', 6514),
  ('suspended', 'Carlotta Workshops', 39.99, 5.99, '30 days', '30 days', 742),
  ('suspended', 'Carlotta Sports', 19.99, 0.00, '30 days', '30 days', 611),
  ('suspended', 'Carlotta Cars Magazine', 2.99, 0.00, '30 days', '30 days', 125862),
  ('suspended', 'Carlotta Flagships', 18.99, 0.00, '30 days', '30 days', 125),
  ('suspended', 'Carlotta Protocols', 15.99, 0.00, '30 days', '30 days', 487),
  ('suspended', 'Carlotta ISP', 89.99, 99.90, '30 days', '30 days', 329),
  ('suspended', 'Carlotta Pumps', 279.99, 198.89, '30 days', '30 days', 4),
  ('suspended', 'Carlotta Assoc.', 69.99, 0.00, '30 days', '30 days', 645);
  `;

  const promoValues = `
  ('active', 'Carlotta Prime', 'FIRST10KACCOUNTS', '5%', '30 days', 10000, 299),
  ('active', 'Carlotta Prime', '10PERCENTOFF', '10%', '30 days', 100, 85),
  ('active', 'Carlotta Dealership', 'FALLBACKSALE', '15%', '30 days', 200, 48),
  ('active', 'Carlotta Twitch', 'EVERYLOWPRICES', '20%', '30 days', 100, 51),
  ('active', 'Carlotta Solar', 'MILITARYDISCOUNT', '25%', '30 days', 50, 11),
  ('active', 'Carlotta Prime', '30PERCENTOFF', '30%', '30 days', 1000, 400),
  ('active', 'Carlotta Sales', 'SPRINGSALE', '50%', '30 days', 30, 29),
  ('active', 'Carlotta Prime', '60PERCENTOFF', '60%', '30 days', 50, 42),
  ('active', 'Carlotta Switch', '70PERCENTOFF', '70%', '30 days', 20, 19),
  ('active', 'Carlotta Prime', '80PERCENTOFF', '80%', '30 days', 10, 1),
  ('active', 'Carlotta Youtube', '90PERCENTOFF', '90%', '30 days', 10, 6),
  ('active', 'Carlotta Prime', 'FREETRIAL', '100%', '30 days', 99999999, 81),
  ('suspended', 'Carlotta .com', 'FREETRIALOFFER', '100%', '30 days', 20, 20),
  ('suspended', 'Carlotta Partners', 'XCLUSIVECLUB', '$20.00', '30 days', 500, 214),
  ('suspended', 'Carlotta Church', '4CHARITY', '100%', '30 days', 1000, 845),
  ('suspended', 'Carlotta Industries', 'HARDWORKENVBENEFITS', '$200.00', '30 days', 1000, 514),
  ('suspended', 'Carlotta Workshops', 'WORKXSHOPPE', '10%', '30 days', 100, 74),
  ('suspended', 'Carlotta Sports', 'GETAWORKOUT', '20%', '30 days', 20, 11),
  ('suspended', 'Carlotta Cars Magazine', '1FREECARMAGZ', '$2.00', '30 days', 100, 62),
  ('suspended', 'Carlotta Flagships', '20PERCENTOFF', '20%', '30 days', 125, 125),
  ('suspended', 'Carlotta Protocols', 'FOLLOWGUIDELINES', '$5.00', '30 days', 500, 487),
  ('suspended', 'Carlotta ISP', 'SIGNMEUP', '$10.00', '30 days', 328, 328),
  ('suspended', 'Carlotta Pumps', '1FREEPUMP', '$100.00', '30 days', 5, 4),
  ('suspended', 'Carlotta Assoc.', 'ASSOCIATED', '$100.00', '30 days', 10, 5);
  `;

  const subValues = `
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
  `;

  const transValues = `
  ('paid', 'Carlotta Prime', 'Sherry Waters', 'Paypal', 29.99),
  ('due', 'Carlotta Prime', 'Parker Posey', '', 29.99),
  ('paid', 'Carlotta Prime', 'Bob Aronssen', 'Venmo', 29.99),
  ('paid', 'Carlotta Prime', 'Shaniqua Smith', 'Stripe', 29.99),
  ('paid', 'Carlotta Prime', 'Tanya Ballschin', 'Stripe', 29.99),
  ('due', 'Carlotta Prime', 'Adam Oates', '', 29.99),
  ('due', 'Carlotta Prime', 'Wes Walls', '', 29.99),
  ('paid', 'Carlotta Prime', 'Siemen Walker', 'Visa Checkout', 29.99),
  ('paid', 'Carlotta Prime', 'Jenny Tanks', 'Stripe', 29.99),
  ('due', 'Carlotta Prime', 'Adamn Vicks', '', 29.99),
  ('due', 'Carlotta Prime', 'Mark Canelo', '', 29.99),
  ('paid', 'Carlotta Prime', 'Amber Lalampas', 'Paypal', 29.99),
  ('refund', 'Carlotta Prime', 'Mark Canelo', 'Paypal', 29.99),
  ('refund', 'Carlotta Prime', 'Axle Root', 'Stripe', 29.99),
  ('refund', 'Carlotta Prime', 'Gary Pilkinson', 'Venmo', 29.99),
  ('credit', 'Carlotta Prime', 'Kelly Ullman', '', 29.99),
  ('refund', 'Carlotta Prime', 'Yasmin Rodrigues', 'Stripe', 29.99),
  ('credit', 'Carlotta Prime', 'Adam Oates', '', 29.99),
  ('credit', 'Carlotta Prime', 'Wes Walls', '', 29.99),
  ('credit', 'Carlotta Prime', 'Kyle Teegue', '', 29.99),
  ('refund', 'Carlotta Prime', 'Alisha Tallis', 'Stripe', 29.99),
  ('credit', 'Carlotta Prime', 'Scott Parker', '', 29.99),
  ('refund', 'Carlotta Prime', 'Emily Voz', 'Visa Checkout', 29.99),
  ('refund', 'Carlotta Prime', 'Carl Sagan', 'Paypal', 29.99);
  `;

  const noteValues = `
    ('Sherry Waters', 'has been added to the Carlotta Corp gateway.', false),
    ('Carl Sagan', 'has cancelled his membership to the Carlotta Prime plan.', false),
    ('Parker Posey', 'is late to pay for the Carlotta Prime plan.', false),
    ('Bob Aronssen', 'has been succesfully charged for the Carlotta Prime membership!', false),
    ('Axle Root', 'has been suspended due to non-payment', true),
    ('Shaniqua Smith', 'has been succesfully charged for the Carlotta Primer membership!', true),
    ('Adam Vicks', 'has parked his membership and is now an inactive subscriber', true);
  `;

  (async () => {
    try {
      await db.none(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS subscribers;
        DROP TABLE IF EXISTS plans;
        DROP TABLE IF EXISTS promotionals;
        DROP TABLE IF EXISTS transactions;
        DROP TABLE IF EXISTS notifications;
        CREATE TABLE subscribers ${subTableOptions};
        CREATE TABLE plans ${planTableOptions};
        CREATE TABLE promotionals ${promoTableOptions};
        CREATE TABLE transactions ${transTableOptions};
        CREATE TABLE notifications ${noteTableOptions};
        INSERT INTO subscribers ${subProperties} VALUES ${subValues};
        INSERT INTO plans ${planProperties} VALUES ${planValues};
        INSERT INTO promotionals ${promoProperties} VALUES ${promoValues};
        INSERT INTO transactions ${transProperties} VALUES ${transValues};
        INSERT INTO notifications ${noteProperties} VALUES ${noteValues};
      `);
      console.log('Seeded database!');
      process.exit(0);
    } catch (err) {
      console.log('ERROR:', err);
      process.exit(0);
    }
  })();
}
