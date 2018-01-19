# Rocketbiller
Rocketbiller - the easiest way to create and manage recurring subscription payments.

## Quickstart Linux:

### 1. Install NodeJS

`curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`
`sudo apt-get install -y nodejs`

### 2. Install MongoDB 3.4

`sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6`
`echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list`
`sudo apt-get update && install -y mongodb-org`
`sudo mkdir /data/db && chown -R $USER /data/db`
`sudo systemctl start mongod`
`sudo systemctl enable mongod`

### 3. Install App Dependencies

`npm i && cd client && npm i`

### 4. Run Node Server

`npm run dev`


## Quickstart OSX:

### 1. Install NodeJS

`$ brew update`
`$ brew install node `

### 2. Install MongoDB 3.4

`brew install mongodb@3.4`
`sudo systemctl start mongod`
`sudo systemctl enable mongod`

### 3. Install App Dependencies

`npm i && cd client && npm i`

### 4. Run Node Server

`npm run dev`


## Compile for production

`cd client && npm run build`


# Day to Day Development Workflow

Since we've got multiple features going on at any given time we need to make sure that master is in reasonable shape at any given time to be deployed to production. As a general rule of thumb, this should be the workflow for development of new features / bug fixes:

1. Create a branch with your name followed by a feature description. For eg. 'fred/document-day-to-day-workflow'
2. Add your feature / squish that bug.
3. Open a Pull Request for another developer to review

# Enabling a user an admin in mongo db

Make sure that you have a development user setup in your db

`mongo`

`use rocketbiller`

`db.users.update({'local.email': 'your@email.com'}, {$set:{"local.admin": true}})`


# Deployment Flow

We use [https://github.com/pstadler/flightplan](https://github.com/pstadler/flightplan) to deploy::

Install with:

`npm install -g flightplan`

Deploy to staging:

`fly staging`

Deploy to production:

`fly production`
