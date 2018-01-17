# Rocketbiller
Rocketbiller - the easiest way to create and manage recurring subscription payments.

## Quickstart OSX:

### 1. Install NodeJS

`$ brew update`
`$ brew install node `

### 2. MongoDB 3.0
`brew install mongodb`

### 3. App
`npm install`

### 4. Bower
`npm install -g bower`

### 5. Frontend
`bower install`

### 6. Make sure redis is installed & running

`redis-server --daemonize yes`

### 7. Boot up node server

`npm run dev`

# Compile Less


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
