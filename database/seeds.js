module.exports = app => {
  const { db } = app.database;

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

  const subProperties = `(status, email, subscriber, password, phone, plan, endDate, amount)`

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

  (async () => {
    try {
      await db.none(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS subscribers;
        CREATE TABLE subscribers ${subTableOptions};
        INSERT INTO subscribers ${subProperties} VALUES ${subValues}
      `);
      console.log('Seeded database!');
      process.exit(0);
    } catch (err) {
      console.log('ERROR:', err);
      process.exit(0);
    }
  })();
}
