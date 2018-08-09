module.exports = app => {
	const { db, query: { createNewUser, findUserByEmail, verifyEmail, setUserAsAdmin } } = app.database;
	const { createRandomToken } = app.shared.helpers;
	const bcrypt = app.get("bcrypt");
	const moment = app.get("moment");

	const selectUserid = id => (`(SELECT id FROM users WHERE id='${id}')`);
	const currentDate = moment.utc()
	const laterDate = moment.utc().add(30, 'days')
	const startDate = currentDate.format("MMMM Do, YYYY")
	const endDate = laterDate.format("MMMM Do, YYYY")
	const startStamp = currentDate.toString()
	const endStamp = laterDate.toString()

	const userTableOptions = `(
		id UUID DEFAULT uuid_generate_v1mc() UNIQUE,
		key SERIAL PRIMARY KEY,
		verified BOOLEAN DEFAULT FALSE,
		email VARCHAR NOT NULL UNIQUE,
		firstName TEXT NOT NULL,
		lastName TEXT NOT NULL,
		password VARCHAR NOT NULL UNIQUE,
		company VARCHAR NOT NULL UNIQUE,
		startDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY'),
		endDate TEXT,
		credit INTEGER DEFAULT 0,
		token VARCHAR UNIQUE,
		collapseSideNav BOOLEAN DEFAULT FALSE,
		isGod BOOLEAN DEFAULT FALSE
	)`

	const noteTableOptions = `(
		id UUID DEFAULT uuid_generate_v1mc(),
		key SERIAL PRIMARY KEY,
		userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		read BOOLEAN DEFAULT false,
		deleted BOOLEAN DEFAULT false,
		subscriber VARCHAR,
		messageDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY HH12:MI AM'),
		message TEXT
	)`;

	const planTableOptions = `(
		id UUID DEFAULT uuid_generate_v1mc(),
		key SERIAL PRIMARY KEY,
		userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		status VARCHAR DEFAULT 'active',
		planName VARCHAR NOT NULL UNIQUE,
		description TEXT NOT NULL,
		amount DECIMAL(12,2) NOT NULL,
		setupFee DECIMAL(12,2),
		billEvery VARCHAR NOT NULL,
		trialPeriod VARCHAR,
		subscribers INTEGER DEFAULT 0
	)`;

	const promoTableOptions = `(
		id UUID DEFAULT uuid_generate_v1mc(),
		key SERIAL PRIMARY KEY,
		userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		status VARCHAR DEFAULT 'active',
		plans TEXT ARRAY NOT NULL,
		promoCode VARCHAR NOT NULL,
		amount INTEGER NOT NULL,
		discountType VARCHAR NOT NULL,
		datestamps TEXT ARRAY NOT NULL,
		startDate TEXT NOT NULL,
		endDate TEXT NOT NULL,
		maxUsage INTEGER NOT NULL,
		totalUsage INTEGER DEFAULT 0
	)`;

	const subTableOptions = `(
		id UUID DEFAULT uuid_generate_v1mc(),
		key SERIAL PRIMARY KEY,
		userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		status VARCHAR DEFAULT 'active',
		email VARCHAR,
		subscriber VARCHAR NOT NULL,
		planName VARCHAR NOT NULL,
		amount DECIMAL(12,2),
		billingAddress TEXT,
		billingCity TEXT,
		billingState TEXT,
		billingUnit TEXT,
		billingZip TEXT,
		contactAddress TEXT,
		contactCity TEXT,
		contactState TEXT,
		contactUnit TEXT,
		contactZip TEXT,
		contactPhone VARCHAR,
		promoCode TEXT,
		sameBillingAddress BOOLEAN,
		startDate TEXT NOT NULL,
		endDate TEXT,
		FOREIGN KEY (planName) REFERENCES plans(planName) ON DELETE CASCADE
	)`;

	const templateTableOptions = `(
		id UUID DEFAULT uuid_generate_v1mc(),
		key SERIAL PRIMARY KEY,
		userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		status VARCHAR DEFAULT 'active',
		fromSender VARCHAR NOT NULL,
		subject VARCHAR NOT NULL,
		templateName VARCHAR UNIQUE,
		uniqueTemplateName VARCHAR UNIQUE,
		message TEXT NOT NULL,
		plans TEXT ARRAY NOT NULL
	)`;

	const transTableOptions = `(
		id UUID DEFAULT uuid_generate_v1mc(),
		key SERIAL PRIMARY KEY,
		userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		status VARCHAR,
		invoice UUID DEFAULT uuid_generate_v1mc(),
		planName VARCHAR NOT NULL,
		subscriber VARCHAR NOT NULL,
		processor VARCHAR NOT NULL,
		amount VARCHAR,
		chargeDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY'),
		refundDate TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY')
	)`;

	const feedbackTableOptions = `(
		id UUID DEFAULT uuid_generate_v1mc(),
		key SERIAL PRIMARY KEY,
		company VARCHAR NOT NULL,
		email VARCHAR NOT NULL,
		reason TEXT
	)`;

	const avatarTableOptions = `(
		userid UUID NOT NULL,
		key SERIAL PRIMARY KEY,
		avatarURL TEXT DEFAULT NULL,
		avatarFilePath TEXT DEFAULT NULL,
		token VARCHAR UNIQUE
	)`;

	const noteProperties = `(userid, subscriber, message, read)`;
	const planProperties = `(userid, status, planName, description, amount, setupFee, billEvery, trialPeriod, subscribers)`;
	const promoProperties = `(userid, status, plans, promoCode, amount, discountType, maxUsage, totalUsage, startDate, endDate, dateStamps)`;
	const subProperties = `(userid, status, email, subscriber, contactPhone, planName, startDate, endDate, amount)`;
	const templateProperties = `(userid, status, templateName, uniqueTemplateName, fromSender, subject, message, plans)`
	const transProperties = `(userid, status, planName, subscriber, processor, amount)`;

	const planValues = id => (`
	(${selectUserid(id)}, 'active', 'Carlotta Prime', 'Carlotta Subscription', 99.99, null, 'Monthly', null, 299),
	(${selectUserid(id)}, 'active', 'Carlotta Switch', 'Carlotta Subscription', 49.99, null, 'Bi-Monthly', '2 Weeks', 85),
	(${selectUserid(id)}, 'active', 'Carlotta Corp', 'Carlotta Subscription', 299.99, 4.99, 'Monthly', null, 35048),
	(${selectUserid(id)}, 'active', 'Carlotta Inc.', 'Carlotta Subscription', 1999.99, 399.99, 'Annually', '3 Months', 14058),
	(${selectUserid(id)}, 'active', 'Carlotta LLC', 'Carlotta Subscription', 499.99, 299.99, 'Quarterly', '2 Weeks', 11),
	(${selectUserid(id)}, 'active', 'Carlotta Dealership', 'Carlotta Subscription', 699.99, 24.99, 'Quarterly', null, 400),
	(${selectUserid(id)}, 'active', 'Carlotta Affiliates', 'Carlotta Subscription', 79.99, 9.99, 'Bi-Weekly', '1 Month', 29),
	(${selectUserid(id)}, 'active', 'Carlotta Sales', 'Carlotta Subscription', 9.99, null, 'Weekly', '1 Week', 642),
	(${selectUserid(id)}, 'active', 'Carlotta Automechs', 'Carlotta Subscription', 14.99, 249.99, 'Monthly', '1 Month', 22),
	(${selectUserid(id)}, 'active', 'Carlotta Solar', 'Carlotta Subscription', 44.99, 199.99, 'Monthly', '2 Weeks', 751),
	(${selectUserid(id)}, 'active', 'Carlotta Twitch', 'Carlotta Subscription', 4.99, null, 'Bi-Monthly', '2 Months', 256),
	(${selectUserid(id)}, 'active', 'Carlotta Youtube', 'Carlotta Subscription', 1.99, null, 'Weekly', null, 81),
	(${selectUserid(id)}, 'suspended', 'Carlotta .com', 'Carlotta Subscription', 69.99, null, 'Monthly', '1 Month', 23),
	(${selectUserid(id)}, 'suspended', 'Carlotta Partners', 'Carlotta Subscription', 99.99, null, 'Bi-Monthly', '1 Month', 214),
	(${selectUserid(id)}, 'suspended', 'Carlotta Church', 'Carlotta Subscription', 0.00, null, 'Annually', null, 845),
	(${selectUserid(id)}, 'suspended', 'Carlotta Industries', 'Carlotta Subscription', 149.99, 29.99, 'Annually', null, 6514),
	(${selectUserid(id)}, 'suspended', 'Carlotta Workshops', 'Carlotta Subscription', 39.99, 5.99, 'Bi-Weekly', '1 Month', 742),
	(${selectUserid(id)}, 'suspended', 'Carlotta Sports', 'Carlotta Subscription', 19.99, null, 'Monthly', null, 611),
	(${selectUserid(id)}, 'suspended', 'Carlotta Cars Magazine', 'Carlotta Subscription', 2.99, null, 'Weekly', '1 Week', 125862),
	(${selectUserid(id)}, 'suspended', 'Carlotta Flagships', 'Carlotta Subscription', 18.99, null, 'Bi-Monthly', '2 Months', 125),
	(${selectUserid(id)}, 'suspended', 'Carlotta Protocols', 'Carlotta Subscription', 15.99, null, 'Bi-Monthly', '2 Months', 487),
	(${selectUserid(id)}, 'suspended', 'Carlotta ISP', 'Carlotta Subscription', 89.99, 99.90, 'Monthly', null, 329),
	(${selectUserid(id)}, 'suspended', 'Carlotta Pumps', 'Carlotta Subscription', 279.99, 198.89, 'Quarterly', '2 Weeks', 4),
	(${selectUserid(id)}, 'suspended', 'Carlotta Assoc.', 'Carlotta Subscription', 69.99, null, 'Monthly', '1 Month', 645);
	`);

	const promoValues = id => (`
	(${selectUserid(id)}, 'active', ARRAY ['Carlotta Prime'], 'FIRST10KACCOUNTS', '5', '%', 10000, 299, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'active', ARRAY ['Carlotta Prime'], '10PERCENTOFF', '10', '%', 100, 85, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'active', ARRAY ['Carlotta Dealership'], 'FALLBACKSALE', '15', '$', 200, 48, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'active', ARRAY ['Carlotta Twitch'], 'EVERYLOWPRICES', '20', '%', 100, 51, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'active', ARRAY ['Carlotta Solar'], 'MILITARYDISCOUNT', '25', '%', 50, 11, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'active', ARRAY ['Carlotta Prime'], '30PERCENTOFF', '30', '%', 1000, 400, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'active', ARRAY ['Carlotta Sales'], 'SPRINGSALE', '50', '$', 30, 29, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'active', ARRAY ['Carlotta Prime'], '60PERCENTOFF', '60', '%', 50, 42, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'active', ARRAY ['Carlotta Switch'], '70PERCENTOFF', '70', '%', 20, 19, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'active', ARRAY ['Carlotta Prime'], '80PERCENTOFF', '80', '%', 10, 1, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'active', ARRAY ['Carlotta Youtube'], '90PERCENTOFF', '90', '%', 10, 6, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'active', ARRAY ['Carlotta Prime'], 'FREETRIAL', '100', '%', 2147483647, 81, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'suspended', ARRAY ['Carlotta .com'], 'FREETRIALOFFER', '100', '%', 20, 20, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'suspended', ARRAY ['Carlotta Partners'], 'XCLUSIVECLUB', '20', '$', 500, 214, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'suspended', ARRAY ['Carlotta Church'], '4CHARITY', '100', '%', 1000, 845, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'suspended', ARRAY ['Carlotta Industries'], 'HARDWORKENVBENEFITS', '200', '$', 1000, 514, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'suspended', ARRAY ['Carlotta Workshops'], 'WORKXSHOPPE', '10', '%', 100, 74, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'suspended', ARRAY ['Carlotta Sports'], 'GETAWORKOUT', '20', '%', 20, 11, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'suspended', ARRAY ['Carlotta Cars Magazine'], '1FREECARMAGZ', '2', '$', 100, 62, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'suspended', ARRAY ['Carlotta Flagships'], '20PERCENTOFF', '20', '%', 125, 125, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'suspended', ARRAY ['Carlotta Protocols'], 'FOLLOWGUIDELINES', '5', '$', 500, 487, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'suspended', ARRAY ['Carlotta ISP'], 'SIGNMEUP', '10', '$', 328, 328, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'suspended', ARRAY ['Carlotta Pumps'], '1FREEPUMP', '100', '$', 5, 4, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']),
	(${selectUserid(id)}, 'suspended', ARRAY ['Carlotta Assoc.'], 'ASSOCIATED', '100', '$', 10, 5, '${startDate}', '${endDate}', ARRAY ['${startStamp}', '${endStamp}']);
	`);

	const subValues = id => (`
	(${selectUserid(id)}, 'active', 'admin@admin.com', 'Admin', '(555) 555-5555', 'Carlotta Prime', '${startDate}', null, 29.99),
	(${selectUserid(id)}, 'active', 'squatters@gmail.com', 'Sherry Waters', '(555) 555-5555', 'Carlotta Prime', '${startDate}', null, 29.99),
	(${selectUserid(id)}, 'active', 'bob-eh@sap.com', 'Bob Aronssen', '(555) 555-5555', 'Carlotta Prime', '${startDate}', null, 29.99),
	(${selectUserid(id)}, 'active', 'shani.smith@hotmail.com', 'Shaniqua Smith', '(555) 555-5555', 'Carlotta Prime', '${startDate}', null, 29.99),
	(${selectUserid(id)}, 'active', 'tanyaballschin@gmail.com', 'Tanya Ballschin', '(555) 555-5555', 'Carlotta Prime', '${startDate}', null, 29.99),
	(${selectUserid(id)}, 'active', 'lukeskywalker@rebelforce.com', 'Siemen Walker', '(555) 555-5555', 'Carlotta Prime', '${startDate}', null, 29.99),
	(${selectUserid(id)}, 'active', 'jTank@aol.com', 'Jenny Tanks', '(555) 555-5555', 'Carlotta Prime', '${startDate}', null, 29.99),
	(${selectUserid(id)}, 'active', 'amberLamps@yahoo.com', 'Amber Lalampas', '(555) 555-5555', 'Carlotta Prime', '${startDate}', null, 29.99),
	(${selectUserid(id)}, 'active', 'kylebTeegue@gmail.com', 'Kyle Teegue', '(555) 555-5555', 'Carlotta Prime', '${startDate}', null, 29.99),
	(${selectUserid(id)}, 'active', 'snakePiliskin@gmail.com', 'Gary Pilkinson', '(555) 555-5555', 'Carlotta Prime', '${startDate}', null, 29.99),
	(${selectUserid(id)}, 'active', 'yasminRod@hotmail.com', 'Yasmin Rodrigues', '(555) 555-5555', 'Carlotta Prime', '${startDate}', null, 29.99),
	(${selectUserid(id)}, 'active', 'adaDamn@photonmail.com', 'Adam Johnson', '(555) 555-5555', 'Carlotta Prime', '${startDate}', null, 29.99),
	(${selectUserid(id)}, 'inactive', 'carlsagan42@yahoo.com', 'Carl Sagan', '(555) 555-555', 'Carlotta Prime', '${startDate}', '${endDate}', 29.99),
	(${selectUserid(id)}, 'inactive', 'seamark@outlook.com', 'Mark Canelo', '(555) 555-555', 'Carlotta Prime', '${startDate}', '${endDate}', 29.99),
	(${selectUserid(id)}, 'suspended', 'axxll@manjaro.com', 'Axle Root', '(555) 555-555', 'Carlotta Prime', '${startDate}', '${endDate}', 29.99),
	(${selectUserid(id)}, 'inactive', 'vicksAdam@sap.com', 'Adamn Vicks', '(555) 555-555', 'Carlotta Prime', '${startDate}', '${endDate}', 29.99),
	(${selectUserid(id)}, 'inactive', 'wallyworld@manjaro.com', 'Wes Walls', '(555) 555-555', 'Carlotta Prime', '${startDate}', '${endDate}', 29.99),
	(${selectUserid(id)}, 'suspended', 'kellyUll@gmail.com', 'Kelly Ullman', '(555) 555-555', 'Carlotta Prime', '${startDate}', '${endDate}', 29.99),
	(${selectUserid(id)}, 'inactive', 'oatesA@aol.com', 'Adam Oates', '(555) 555-555', 'Carlotta Prime', '${startDate}', '${endDate}', 29.99),
	(${selectUserid(id)}, 'suspended', 'scottParker@jaro.com', 'Scott Parker', '(555) 555-555', 'Carlotta Prime', '${startDate}', '${endDate}', 29.99),
	(${selectUserid(id)}, 'suspended', 'asmLossenger@mancusco.com', 'Emily Loz', '(555) 555-555', 'Carlotta Prime', '${startDate}', '${endDate}', 29.99),
	(${selectUserid(id)}, 'inactive', 'pparks@akins.com', 'Parker Posey', '(555) 555-555', 'Carlotta Prime', '${startDate}', '${endDate}', 29.99),
	(${selectUserid(id)}, 'suspended', 'aleashtrails@kilmas.com', 'Alisha Tallis', '(555) 555-555', 'Carlotta Prime', '${startDate}', '${endDate}', 29.99),
	(${selectUserid(id)}, 'suspended', '88Damon@photonmail.com', 'Damien Smith', '(555) 555-5555', 'Carlotta Prime', '${startDate}', '${endDate}', 29.99);
	`);

	const templateValues = id => (`
	(${selectUserid(id)}, 'active', 'Partners Template', 'partners-template', 'betatester@subskribble.com', 'Test Template Subject', '<span>This is a test example template</span>', ARRAY ['Carlotta Dealership', 'Carlotta Prime', 'Carlotta Sales', 'Carlotta Youtube']),
	(${selectUserid(id)}, 'active', 'Affiliates Template', 'affiliates-template', 'betatester@subskribble.com', 'Test Template Subject', '<span>This is a test example template</span>', ARRAY ['Carlotta Prime', 'Carlotta Dealership', 'Carlotta Solar'] ),
	(${selectUserid(id)}, 'active', 'Subscriber Template', 'subscriber-template', 'betatester@subskribble.com', 'Test Template Subject', '<span>This is a test example template</span>', ARRAY ['Carlotta Prime']),
	(${selectUserid(id)}, 'active', 'Employee Template', 'employee-template', 'betatester@subskribble.com', 'Test Template Subject', '<span>This is a test example template</span>', ARRAY ['Carlotta Corp']),
	(${selectUserid(id)}, 'suspended', 'General Newsletter Template', 'general-newsletter-template', 'betatester@subskribble.com', 'Test Template Subject', '<span>This is a test example template</span>', ARRAY ['Carlotta Cars Magazine', 'Carlotta Sports']),
	(${selectUserid(id)}, 'suspended', 'Flagships Template', 'flagships-template', 'betatester@subskribble.com', 'Test Template Subject', '<span>This is a test example template</span>', ARRAY ['Carlotta Flashships'] ),
	(${selectUserid(id)}, 'suspended', 'Billing ISP Template', 'billing-isp-template', 'betatester@subskribble.com', 'Test Template Subject', '<span>This is a test example template</span>', ARRAY ['Carlotta ISP']),
	(${selectUserid(id)}, 'suspended', 'Billing Cars Template', 'billing-cars-template', 'betatester@subskribble.com', 'Test Template Subject', '<span>This is a test example template</span>', ARRAY ['Carlotta Cars Magazine']);
	`)

	const transValues = id => (`
	(${selectUserid(id)}, 'paid', 'Carlotta Prime', 'Sherry Waters', 'Paypal', 29.99),
	(${selectUserid(id)}, 'due', 'Carlotta Prime', 'Parker Posey', '', 29.99),
	(${selectUserid(id)}, 'paid', 'Carlotta Prime', 'Bob Aronssen', 'Venmo', 29.99),
	(${selectUserid(id)}, 'paid', 'Carlotta Prime', 'Shaniqua Smith', 'Stripe', 29.99),
	(${selectUserid(id)}, 'paid', 'Carlotta Prime', 'Tanya Ballschin', 'Stripe', 29.99),
	(${selectUserid(id)}, 'due', 'Carlotta Prime', 'Adam Oates', '', 29.99),
	(${selectUserid(id)}, 'due', 'Carlotta Prime', 'Wes Walls', '', 29.99),
	(${selectUserid(id)}, 'paid', 'Carlotta Prime', 'Siemen Walker', 'Visa Checkout', 29.99),
	(${selectUserid(id)}, 'paid', 'Carlotta Prime', 'Jenny Tanks', 'Stripe', 29.99),
	(${selectUserid(id)}, 'due', 'Carlotta Prime', 'Adamn Vicks', '', 29.99),
	(${selectUserid(id)}, 'due', 'Carlotta Prime', 'Mark Canelo', '', 29.99),
	(${selectUserid(id)}, 'paid', 'Carlotta Prime', 'Amber Lalampas', 'Paypal', 29.99),
	(${selectUserid(id)}, 'refund', 'Carlotta Prime', 'Mark Canelo', 'Paypal', 29.99),
	(${selectUserid(id)}, 'refund', 'Carlotta Prime', 'Axle Root', 'Stripe', 29.99),
	(${selectUserid(id)}, 'refund', 'Carlotta Prime', 'Gary Pilkinson', 'Venmo', 29.99),
	(${selectUserid(id)}, 'credit', 'Carlotta Prime', 'Kelly Ullman', '', 29.99),
	(${selectUserid(id)}, 'refund', 'Carlotta Prime', 'Yasmin Rodrigues', 'Stripe', 29.99),
	(${selectUserid(id)}, 'credit', 'Carlotta Prime', 'Adam Oates', '', 29.99),
	(${selectUserid(id)}, 'credit', 'Carlotta Prime', 'Wes Walls', '', 29.99),
	(${selectUserid(id)}, 'credit', 'Carlotta Prime', 'Kyle Teegue', '', 29.99),
	(${selectUserid(id)}, 'refund', 'Carlotta Prime', 'Alisha Tallis', 'Stripe', 29.99),
	(${selectUserid(id)}, 'credit', 'Carlotta Prime', 'Scott Parker', '', 29.99),
	(${selectUserid(id)}, 'refund', 'Carlotta Prime', 'Emily Voz', 'Visa Checkout', 29.99),
	(${selectUserid(id)}, 'refund', 'Carlotta Prime', 'Carl Sagan', 'Paypal', 29.99);
	`);

	const noteValues = id => (`
	(${selectUserid(id)}, 'Sherry Waters', 'has been added to the Carlotta Corp gateway.', false),
	(${selectUserid(id)}, 'Carl Sagan', 'has cancelled his membership to the Carlotta Prime plan.', false),
	(${selectUserid(id)}, 'Parker Posey', 'is late to pay for the Carlotta Prime plan.', false),
	(${selectUserid(id)}, 'Bob Aronssen', 'has been succesfully charged for the Carlotta Prime membership!', false),
	(${selectUserid(id)}, 'Axle Root', 'has been suspended due to non-payment', true),
	(${selectUserid(id)}, 'Shaniqua Smith', 'has been succesfully charged for the Carlotta Primer membership!', true),
	(${selectUserid(id)}, 'Adam Vicks', 'has parked his membership and is now an inactive subscriber', true);
	`);

	(async () => {
		try {
			// create DB tables
			await db.none(`
				CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
				DROP TABLE IF EXISTS users CASCADE;
				DROP TABLE IF EXISTS subscribers;
				DROP TABLE IF EXISTS plans;
				DROP TABLE IF EXISTS promotionals;
				DROP TABLE IF EXISTS transactions;
				DROP TABLE IF EXISTS templates;
				DROP TABLE IF EXISTS notifications;
				DROP TABLE IF EXISTS avatars;
				DROP TABLE IF EXISTS feedback;
				CREATE TABLE users ${userTableOptions};
				CREATE TABLE plans ${planTableOptions};
				CREATE TABLE promotionals ${promoTableOptions};
				CREATE TABLE notifications ${noteTableOptions};
				CREATE TABLE subscribers ${subTableOptions};
				CREATE TABLE templates ${templateTableOptions};
				CREATE TABLE transactions ${transTableOptions};
				CREATE TABLE feedback ${feedbackTableOptions};
				CREATE TABLE avatars ${avatarTableOptions};
			`);

			// create new user
			const token = createRandomToken(); // a token used for email verification
			try {
				const newPassword = await bcrypt.hash('password123', 12) // hash password before attempting to create the user
				await db.none(createNewUser(),['betatester@subskribble.com', newPassword, 'Beta', 'Tester', 'Subskribble', token])
			} catch (err) { return console.log('\n--[ERROR]-- Seed FAILED to create a new user! Process has been terminated.'); }

			// get newly created user info
			const existingUser = await db.oneOrNone(findUserByEmail(), ['betatester@subskribble.com']);
			if (!existingUser) { return console.log('\n--[ERROR]-- Seed FAILED to find the newly created user! Process has been terminated.'); }

			// verify newly created user's email
			await db.none(verifyEmail(), [existingUser.email]);

			// set users as admin
			const { id } = existingUser;
			await db.none(setUserAsAdmin(), [id]);

			// inset fake data into created tables
			await db.none(`
				INSERT INTO plans ${planProperties} VALUES ${planValues(id)};
				INSERT INTO notifications ${noteProperties} VALUES ${noteValues(id)};
				INSERT INTO promotionals ${promoProperties} VALUES ${promoValues(id)};
				INSERT INTO subscribers ${subProperties} VALUES ${subValues(id)};
				INSERT INTO templates ${templateProperties} VALUES ${templateValues(id)};
				INSERT INTO transactions ${transProperties} VALUES ${transValues(id)};
			`)

			console.log('--[SUCCESS]-- Seeded database!');
		} catch (err) { console.log('--[ERROR]-- ', err.toString());
		} finally { process.exit(0); }
	})();
}
