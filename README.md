# subskribble
subskribble - an experimental app to create, manage, and send personalized updates to a lists of subscribers.

## Quickstart
<details>
<summary>Linux Instructions</summary>
<br />
<ul style="list-style-type:circle">
  Install NodeJS: <pre><code>curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - && sudo apt-get update && install -y nodejs </code></pre>
  Install and Configure PostgreSQL:
  <ul>
    <li><pre><code>sudo apt-get install postgresql postgresql-contrib</code></pre></li>
    <li>Logs into PostgreSQL shell with default user "postgres": <pre><code>sudo -u postgres psql</code></pre></li>
    <li>Asks to set a password for "postgres"; after pressing enter, it'll prompt for the password: <pre><code>password postgres</code></pre></li>
    <li>Exits PostgreSQL shell: <pre><code>\q</code></pre></li>
  </ul>
  Create a Custom postgreSQL User (optional):
  <ul>
    <li>Logs into postgreSQL as "postgres": <pre><code>psql -U postgres</code></pre></li>
    <li>Creates a new user with a password: <pre><code>CREATE ROLE 'username' WITH LOGIN PASSWORD 'password';</code></pre></li>
    <li>Gives user limited ability to create DBs or GRANT ALL PRIVILEDGES ON DATABASE 'dbname' TO 'username';<pre><code>ALTER ROLE <username> CREATEDB;</code></pre></li>
    <li>Shows active DB maintainers: <pre><code>\du</code></pre></li>
    <li>Exits PostgreSQL shell: <pre><code>\q</code></pre></li>
  </ul>
  Starting PostgreSQL on Boot (optional): <pre><code>sudo systemctl enable postgresql</pre></code>
  Install App Dependencies: <pre><code>npm i && cd client && npm i</pre></code>
  Seed DB and Run Node Server
  <ul>
    <li>Required to initially create a DB, otherwise 'npm run seeds' afterward: <pre><code>psql -U <username> -f initDB.sql</code></pre></li>
    <li><pre><code>npm run dev</code></pre></li>
  </ul>
</ul>
</details>


<details>
<summary>MacOS Instructions</summary>
<br />
<ul style="list-style-type:circle">
  Install Brew: <pre><code>/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"</code></pre>
  Install NodeJS and PostgreSQL: <pre><code>brew update && brew install node && brew install postgresql</code></pre>
  Configure PostgreSQL:
  <ul>
    <li>Logs into PostgreSQL shell with default user "postgres": <pre><code>sudo -u postgres psql</code></pre></li>
    <li>Asks to set a password for "postgres"; after pressing enter, it'll prompt for the password: <pre><code>password postgres</code></pre></li>
    <li>Exits PostgreSQL shell: <pre><code>\q</code></pre></li>
  </ul>
  Create a Custom postgreSQL User (optional):
  <ul>
    <li>Logs into postgreSQL as "postgres": <pre><code>psql -U postgres</code></pre></li>
    <li>Creates a new user with a password: <pre><code>CREATE ROLE 'username' WITH LOGIN PASSWORD 'password';</code></pre></li>
    <li>Gives user limited ability to create DBs or GRANT ALL PRIVILEDGES ON DATABASE 'dbname' TO 'username';<pre><code>ALTER ROLE <username> CREATEDB;</code></pre></li>
    <li>Shows active DB maintainers: <pre><code>\du</code></pre></li>
    <li>Exits PostgreSQL shell: <pre><code>\q</code></pre></li>
  </ul>
  Starting PostgreSQL on Boot (optional): <pre><code>brew services start postgresql</pre></code>
  Install App Dependencies: <pre><code>npm i && cd client && npm i</pre></code>
  Seed DB and Run Node Server
  <ul>
    <li>Required to initially create a DB, otherwise 'npm run seeds' afterward: <pre><code>psql -U <username> -f initDB.sql</code></pre></li>
    <li><pre><code>npm run dev</code></pre></li>
  </ul>
</ul>
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
- You **MUST** initialize the PostgreSQL database by executing `psql -U <username> -f init.sql` while at the app root.
- You **MUST** sign up with a valid email address (or use the beta test email).
- You **MUST** have a valid <a href="https://sendgrid.com/">SendGrid</a> API key (for sending/receiving emails).
- You **MUST** create a single js config file that exports an object:
<details>
<summary>Example Config</summary>
```javascript
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
