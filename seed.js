require('./config/vars');
const db = require('./db/config');

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

const subOptions = `
('active', 'admin@admin.com', 'Admin', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
('active', 'squatters@gmail.com', 'Sherry Waters', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
('active', 'bob-eh@sap.com', 'Bob Aronssen', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
('active', 'shani.smith@hotmail.com', 'Shaniqua Smith', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
('active', 'tanyaballschin@gmail.com', 'Tanya Ballschin', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
('active', 'lukeskywalker@rebelforce.com', 'Siemen Walker', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
('active', 'jLamar@gmail.com', 'Jerry Lamar', 'password', '(555) 555-5555', 'Carlotta Prime', null, 29.99),
('inactive', 'carlsagan42@yahoo.com', 'Carl Sagan', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 3, 2018', 29.99),
('inactive', 'seamark@outlook.com', 'Mark Canelo', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 12, 2018', 29.99),
('suspended', 'axxll@manjaro.com', 'Axle Root', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 16, 2018', 29.99),
('inactive', 'vicksAdam@sap.com', 'Adamn Vicks', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99),
('suspended', 'wallyworld@manjaro.com', 'Wes Walls', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99),
('suspended', 'aleashtrails@gmail.com', 'Alisha Tallis', 'password', '(555) 555-555', 'Carlotta Prime', 'Jan 17, 2018', 29.99)
`;

(async () => {
  try {
    await db.none(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      DROP TABLE IF EXISTS subscribers;
      CREATE TABLE subscribers ${subTableOptions};
      INSERT INTO subscribers ${subProperties} VALUES ${subOptions}
    `);
    console.log('Seeded database!');
    process.exit(0);
  } catch (err) {
    console.log('ERROR:', err);
    process.exit(0);
  }
})();
