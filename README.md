# subskribble
subskribble - an experimental app to create, manage, and send personalized updates to a lists of subscribers.

## Quickstart Linux:

### 1. Install NodeJS

- `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`
- `sudo apt-get update && install -y nodejs`

### 2. Install and Configure PostgreSQL†
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
- `psql -U <username> -f seeds.sql` (only required on first run, otherwise `npm run seed`)
- `npm run dev`



## Quickstart OSX:

### 1. Install Brew

- `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

### 2. Install NodeJS and PostgreSQL

- `brew update`
- `brew install node`
- `brew install postgresql`

### 3. Configure PostgreSQL†
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
- `psql -U <username> -f seeds.sql` (only required on first run, otherwise `npm run seed`)
- `npm run dev`


*Note*: In order to run this app, you must create and load an .env configuration similar to this:
```
DB=subskribble-demo
DBPORT=5432
DBPASSWORD=<password>
DBOWNER=<dbOwner>
HOST=localhost
PORT=4000
URL=http://localhost:4000/
```


† If running into authentication failures when attempting to connect to psql, please follow this guide: <a href="https://connect.boundlessgeo.com/docs/suite/4.8/dataadmin/pgGettingStarted/firstconnect.html">Getting Started</a>

# Compile Front-End For Production

- `cd client && npm run build`
