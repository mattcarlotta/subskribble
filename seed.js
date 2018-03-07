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
  startDate DATE DEFAULT NOW(),
  endDate DATE,
  amount DECIMAL(12,2),
  isGod BOOLEAN DEFAULT FALSE
)`;

const subProperties = `(status, email, subscriber, password, phone, plan, amount)`

const subOptions = `
('active', 'admin@admin.com', 'Admin', 'password', '(555) 555-5555', 'Carlotta Prime', 29.99),
('active', 'squatters@gmail.com', 'Sherry Waters', 'password', '(555) 555-5555', 'Carlotta Prime', 29.99),
('active', 'bob-eh@sap.com', 'Bob Aronssen', 'password', '(555) 555-5555', 'Carlotta Prime', 29.99),
('active', 'shani.smith@hotmail.com', 'Shaniqua Smith', 'password', '(555) 555-5555', 'Carlotta Prime', 29.99),
('active', 'tanyaballschin@gmail.com', 'Tanya Ballschin', 'password', '(555) 555-5555', 'Carlotta Prime', 29.99),
('active', 'lukeskywalker@rebelforce.com', 'Siemen Walker', 'password', '(555) 555-5555', 'Carlotta Prime', 29.99),
('active', 'jLamar@gmail.com', 'Jerry Lamar', 'password', '(555) 555-5555', 'Carlotta Prime', 29.99)
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
