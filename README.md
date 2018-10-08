# subskribble
subskribble - an experimental app to create, manage, and send personalized updates to a list of subscribers.


## Quick Links

- [Requirements](#requirements)
- [Quickstart Linux](#quickstart-linux)
- [Quickstart MacOS](#quickstart-macos)
- [Compile For Production](#compile-for-production)
- [Notes](#notes)


## Requirements

⚠️ In order to run and use this app:
- You **MUST** install and start the <a href="https://github.com/mattcarlotta/subskribble-avatar-microservice">subskribble-avatar-microservice</a> first.
- You **MUST** initialize the PostgreSQL database by executing `psql -U <username> -f initDB.sql` while at the app root.
- You **MUST** sign up with a valid email address (or use the beta test email -- see [Notes](#notes) below).
- You **MUST** have a valid <a href="https://sendgrid.com/">SendGrid</a> API key (for sending/receiving emails).
- You **MUST** create a config file: `subskribble/env/config.js` that exports an object:
<details>
<summary>Example App Config</summary>
<pre><code>
module.exports = {
	"development": {
		cookieKey: "unique_cookie_key",
		database: "postgres_db_name",
		dbport: postgres_db_port,
		dbpassword: "postgres_db_password",
		dbowner: "postgres_db_owner",
		host: "localhost",
		port: 5000,
		portal: "http://localhost:3000/",
		sendgridAPIKey: "sendgrid_api_key",
	},
	"production": {
		cookieKey: "unique_cookie_key",
		database: "postgres_db_name",
		dbport: postgres_db_port,
		dbpassword: "postgres_db_password",
		dbowner: "postgres_db_owner",
		host: "localhost",
		port: 5000,
		portal: "http://project-domain.com",
		sendgridAPIKey: "sendgrid_api_key",
	},
	"staging": {
		cookieKey: "unique_cookie_key",
		database: "postgres_db_name",
		dbport: postgres_db_port,
		dbpassword: "postgres_db_password",
		dbowner: "postgres_db_owner",
		host: "localhost",
		port: 5000,
		portal: "http://staging-domain.com",
		sendgridAPIKey: "sendgrid_api_key",
	},
	"testing": {
		cookieKey: "unique_cookie_key",
		database: "postgres_db_name",
		dbport: postgres_db_port,
		dbpassword: "postgres_db_password",
		dbowner: "postgres_db_owner",
		host: "localhost",
		port: 5000,
		portal: "http://testing-domain.com",
		sendgridAPIKey: "sendgrid_api_key",
	}
}
</code></pre>
</details>


- You **MUST** create a config file: `subskribble-avatar-microservice/env/config.js` that exports an object:
<details>
<summary>Example Avatar Microservice Config</summary>
<pre><code>
module.exports = {
	"development": {
		apiURL: "http://localhost:4000",
		cookieKey: "unique_cookie_key",
		database: "postgres_db_name",
		dbport: postgres_db_port,
		dbpassword: "postgres_db_password",
		dbowner: "postgres_db_owner",
		host: "localhost",
		port: 4000,
		portal: "http://localhost:3000"
	},
	"production": {
		apiURL: "http://avatar.project-domain.com",
		cookieKey: "unique_cookie_key",
		database: "postgres_db_name",
		dbport: postgres_db_port,
		dbpassword: "postgres_db_password",
		dbowner: "postgres_db_owner",
		host: "localhost",
		port: 4000,
		portal: "http://localhost:3000"
	},
	"staging": {
		apiURL: "http://avatar.staging-domain.com",
		cookieKey: "unique_cookie_key",
		database: "postgres_db_name",
		dbport: postgres_db_port,
		dbpassword: "postgres_db_password",
		dbowner: "postgres_db_owner",
		host: "localhost",
		port: 4000,
		portal: "http://staging-domain.com"
	},
	"testing": {
		apiURL: "http://avatar.testing-domain.com",
		cookieKey: "unique_cookie_key",
		database: "postgres_db_name",
		dbport: postgres_db_port,
		dbpassword: "postgres_db_password",
		dbowner: "postgres_db_owner",
		host: "localhost",
		port: 4000,
		portal: "http://testing-domain.com"
	}
}
</code></pre>
</details>


## Quickstart Linux

### 1. Install NodeJS and Nodemon

- `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`
- `sudo apt-get update`
- `sudo apt-get install -y nodejs`
- `sudo npm install -g nodemon`

### 2. Install and Configure PostgreSQL (v10)†
- `sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main" > /etc/apt/sources.list.d/pgdg.list'` (adds the PGDG APT source file)
- `wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -` (adds the PostgreSQL Package Repository Key)
- `sudo apt-get install postgresql postgresql-contrib` (installs postgres-10 with additional modules)
- `sudo systemctl start postgresql` (starts PostgreSQL services)
- `sudo -u postgres psql` (logs in to a PostgreSQL shell as super user postgres)
- `psql`(logs into PostgreSQL DB)
- `\password postgres` (will ask to set a password for "postgres"; after pressing enter, it'll prompt for the password)
- `\q` (exits PostgreSQL shell)

### 3. Create a Custom PostgreSQL User (optional)
- `psql -U postgres` (logs into PostgreSQL DB as "postgres", enter newly created "postgres" password when prompted)
- `CREATE ROLE <username> WITH LOGIN PASSWORD '<password>';` (creates a new user with a password)
- `ALTER ROLE <username> CREATEDB;` (gives user limited ability to create DBs or `GRANT ALL PRIVILEDGES ON DATABASE <dbname> TO <username>;`)
- `\du` (shows active DB maintainers)
- `\q` (exits PostgreSQL shell)

### 4. Starting PostgreSQL on Boot (optional)
- `sudo systemctl enable postgresql`

### 5. Install App Dependencies

- `npm i && cd client && npm i`

### 6. Seed DB and Run Node Server
- `psql -U <username> -f initDB.sql` (only required to initialize the DB, then you can optionally run `npm run seeds`)
- `npm run dev` (while at the root directory)


## Quickstart MacOS

### 1. Install Brew

- `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

### 2. Install NodeJS, Nodemon and PostgreSQL

- `brew update`
- `brew install node`
- `brew install nodemon`
- `brew install postgresql postgresql-contrib`

### 3. Configure PostgreSQL†
- `sudo -u postgres psql` (logs in to a PostgreSQL shell as super user postgres)
- `psql`(logs into PostgreSQL DB)
- `\password postgres` (will ask to set a password for "postgres"; after pressing enter, it'll prompt for the password)
- `\q` (exits PostgreSQL shell)

### 4. Create a Custom PostgreSQL User (optional)
- `psql -U postgres` (logs into PostgreSQL as "postgres", enter newly created postgres password when prompted)
- `CREATE ROLE <username> WITH LOGIN PASSWORD '<password>';` (creates a new user with a password)
- `ALTER ROLE <username> CREATEDB;` (gives user limited ability to create DBs or `GRANT ALL PRIVILEDGES ON DATABASE <dbname> TO <username>;`)
- `\du` (shows active DB maintainers)
- `\q` (exits PostgreSQL shell)

### 5. Starting PostgreSQL on Boot (optional)
- `brew services start postgresql`

### 6. Install App Dependencies

- `npm i && cd client && npm i`

### 7. Seed DB and Run Node Server
- `psql -U <username> -f initDB.sql` (only required to initialize the DB, then you can optionally run `npm run seeds`)
- `npm run dev` (while at the root directory)


## Compile For Production

- `cd client && npm run build`

## Notes
⚠️ If running into authentication failures when attempting to connect to psql, please follow this guide: <a href="https://connect.boundlessgeo.com/docs/suite/4.8/dataadmin/pgGettingStarted/firstconnect.html">Getting Started</a>

⚠️ When running `npm run seeds`, a user account will be created that will be seeded with data. You may bypass signing up with a valid email and instead sign into this account for testing purposes:
```
login: betatester@subskribble.com
password: password123
```
