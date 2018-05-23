# subskribble
subskribble - an experimental app to create, manage, and send personalized updates to a lists of subscribers.

## Quickstart
<details>
<summary>Linux Instructions</summary>

### 1. Install NodeJS

- `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`
- `sudo apt-get update && install -y nodejs`

### 2. Install and Configure PostgreSQL
- `sudo apt-get install postgresql postgresql-contrib`
- `sudo -u postgres psql` (logs into PostgreSQL shell with default user "postgres")
- `\password postgres` (will ask to set a password for "postgres"; after pressing enter, it'll prompt for the password)
- `\q` (exits postgresSQL shell)

### 3. Create a Custom PostgreSQL User (optional)
- `psql -U postgres` (logs into PostgreSQL as "postgres")
- `CREATE ROLE <username> WITH LOGIN PASSWORD '<password>';` (creates a new user with a password)
- `ALTER ROLE <username> CREATEDB;` (gives user limited ability to create DBs or `GRANT ALL PRIVILEDGES ON DATABASE <dbname> TO <username>;`)
- `\du` (shows active DB maintainers)
- `\q` (exits postgresSQL shell)

### 4. Starting PostgreSQL on Boot (optional)
- `sudo systemctl enable postgresql`

### 5. Install App Dependencies

- `npm i && cd client && npm i`

### 6. Seed DB and Run Node Server
- `psql -U <username> -f initializeDB.sql` (only required to initially create a DB, otherwise `npm run seeds`)
- `npm run dev`
</details>

<details>
<summary>MacOS Instructions</summary>

### 1. Install Brew

- `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

### 2. Install NodeJS and PostgreSQL

- `brew update`
- `brew install node`
- `brew install postgresql`

### 3. Configure PostgreSQL
- `sudo -u postgres psql` (logs into PostgreSQL shell with default user "postgres")
- `\password postgres` (will ask to set a password for "postgres"; after pressing enter, it'll prompt for the password)
- `\q` (exits PostgreSQL shell)

### 4. Create a Custom postgreSQL User (optional)
- `psql -U postgres` (logs into postgreSQL as "postgres")
- `CREATE ROLE <username> WITH LOGIN PASSWORD '<password>';` (creates a new user with a password)
- `ALTER ROLE <username> CREATEDB;` (gives user limited ability to create DBs or `GRANT ALL PRIVILEDGES ON DATABASE <dbname> TO <username>;`)
- `\du` (shows active DB maintainers)
- `\q` (exits PostgreSQL shell)

### 5. Starting PostgreSQL on Boot (optional)
- `brew services start postgresql`

### 6. Install App Dependencies

- `npm i && cd client && npm i`

### 7. Seed DB and Run Node Server
- `psql -U <username> -f initializeDB.sql` (required to initially create a DB, otherwise `npm run seeds` afterward)
- `npm run dev`
</details>

## Compile Front-End For Production

- `cd client && npm run build`

## Notes
⚠️ If running into authentication failures when attempting to connect to psql, please follow this guide: <a href="https://connect.boundlessgeo.com/docs/suite/4.8/dataadmin/pgGettingStarted/firstconnect.html">Getting Started</a>

⚠️ When running `npm run seeds`, a user account will be created that will be seeded with data. You may bypass signing up with a valid email and instead sign into this account for testing purposes:
```
login: betatester@subskribble.com
password: password123
```

⚠️ In order to run and use this app:
- You **MUST** initialize the PostgreSQL database by executing `psql -U <username> -f initializeDB.sql` while at the app root.
- You **MUST** sign up with a valid email address (or use the beta test email).
- You **MUST** have a valid <a href="https://sendgrid.com/">SendGrid</a> API key (for sending/receiving emails).
- You **MUST** create a single js config file that exports an object:
<details>
<summary>Example Config</summary>

```js
module.exports = {
  "development": {
    apiURL: "http://localhost:3000/",
    cookieKey: "<unique_cookie_key>",
    database: "<postgres_db_name>",
    dbport: <postgres_db_port>,
    dbpassword: "<postgres_db_password>",
    dbowner: "<postgres_db_owner>",
    host: "localhost",
    port: 5000,
    sendgridAPIKey: "<sendgrid_api_key>",
    url: "http://localhost:5000/",
  },
  "production": {
    apiURL: "<host>",
    cookieKey: "<unique_cookie_key>",
    database: "<postgres_db_name>",
    dbport: <postgres_db_port>,
    dbpassword: "<postgres_db_password>",
    dbowner: "<postgres_db_owner>",
    host: "localhost",
    port: 5000,
    sendgridAPIKey: "<sendgrid_api_key>",
    url: "http://localhost:5000/",
  },
  "staging": {
    apiURL: "<host>",
    cookieKey: "<unique_cookie_key>",
    database: "<postgres_db_name>",
    dbport: <postgres_db_port>,
    dbpassword: "<postgres_db_password>",
    dbowner: "<postgres_db_owner>",
    host: "localhost",
    port: 5000,
    sendgridAPIKey: "<sendgrid_api_key>",
    url: "http://localhost:5000/",
  },
  "testing": {
    apiURL: "<host>",
    cookieKey: "<unique_cookie_key>",
    database: "<postgres_db_name>",
    dbport: <postgres_db_port>,
    dbpassword: "<postgres_db_password>",
    dbowner: "<postgres_db_owner>",
    host: "localhost",
    port: 5000,
    sendgridAPIKey: "<sendgrid_api_key>",
    url: "http://localhost:5000/",
  }
}
```

</details>
