const statusType = (status, userid) => (status.length > 1
  ? `WHERE status='${status[0]}' AND userid='${userid}' OR status='${
    status[1]
  }' AND userid='${userid}'`
  : `WHERE status='${status[0]}' AND userid='${userid}'`);

const adminQueries = {
  setUserAsAdmin: 'UPDATE users SET isGod=true WHERE id=$1',
};

const avatarQueries = {
  getAvatarToken: 'SELECT token,userid FROM avatars WHERE userid=$1',
};

const authQueries = {
  createNewUser:
    'INSERT INTO users(email, password, firstName, lastName, company, token, startDate) VALUES ($1, $2, $3, $4, $5, $6, $7)',
  deleteUserAccount:
    'DELETE FROM users WHERE id=$1 AND email=$2 AND company=$3 RETURNING *',
  getTokenByEmail: 'SELECT token FROM users WHERE email=$1',
  getCurrentUserDetails:
    'SELECT email, company, firstName, lastName FROM users WHERE id=$1',
  getUserDetails:
    'SELECT id, company, collapsesidenav, email, firstname, isgod, lastname FROM users WHERE email=$1',
  getUserPassword: 'Select password FROM users WHERE id=$1',
  findCompany: 'SELECT company FROM users WHERE company=$1',
  findUserByEmail:
    'SELECT id, email, firstName, lastName, password, verified FROM users WHERE email=$1',
  findUserById: 'SELECT * FROM users WHERE id=$1',
  findUserByToken: 'SELECT * FROM users WHERE token=$1',
  resetToken: 'UPDATE users SET token=$1 WHERE email=$2',
  updateCompanyName: 'UPDATE users SET company=$2 WHERE id=$1',
  updateEmailAddress:
    'UPDATE users SET email=$2, token=$3, verified=false WHERE id=$1',
  updateUserName: 'UPDATE users SET firstName=$2, lastName=$3 WHERE id=$1',
  updateUserPassword: 'UPDATE users SET password=$2 WHERE id=$1',
  updateSidebarState: 'UPDATE users SET collapseSideNav=$2 WHERE id=$1',
  verifyEmail: 'UPDATE users SET verified=true WHERE email=$1',
};

const dashboardQueries = {
  getChargesSum:
    'SELECT count(chargeDate) FROM transactions WHERE userid=$1 AND chargeDate>=$2 AND chargeDate<$3',
  getInactiveSubscriberSum:
    "SELECT count(status) FROM subscribers WHERE userid=$1 AND status='inactive' OR status='suspended'",
  getInactiveTemplateSum:
    "SELECT count(templateName) FROM templates WHERE userid=$1 AND status='suspended'",
  getMessageSum:
    'SELECT count(sentDate) FROM messages WHERE userid=$1 AND sentDate>=$2 AND sentDate<$3',
  getPlanSum:
    "SELECT count(planName) FROM plans WHERE userid=$1 AND status='active'",
  getPlansTop6:
    "SELECT planName,subscribers FROM plans WHERE userid=$1 AND status='active' ORDER BY subscribers DESC LIMIT 6",
  getPromotionSum:
    "SELECT count(promoCode) FROM promotionals WHERE userid=$1 AND status='active' AND startDate>=$2 AND startDate<$3",
  getRefundSum:
    'SELECT count(refundDate) FROM transactions WHERE userid=$1 AND refundDate>=$2 AND refundDate<$3',
  getSubscriberSum:
    'SELECT sum(subscribers) FROM plans WHERE userid=$1 AND startDate>=$2 AND startDate<$3',
  getTemplateSum:
    "SELECT count(templateName) FROM templates WHERE userid=$1 AND status='active'",
  getAllDashboardDetails: `
      SELECT * FROM (SELECT sum(subscribers) AS subscribers FROM plans WHERE userid=$1) subscribers
      CROSS JOIN (SELECT count(status) AS inactivesubscribers FROM subscribers WHERE userid=$1 AND status='inactive' OR user=$1 AND status='suspended') inactivesubs
      CROSS JOIN (SELECT count(planName) AS plans FROM plans WHERE userid=$1 AND status='active') plans
      CROSS JOIN (SELECT json_agg(filtered_plans_table) as popularplans
        FROM (SELECT planName,subscribers FROM plans WHERE userid=$1 AND status='active' ORDER BY subscribers DESC LIMIT 6) as filtered_plans_table
      ) popularplans
      CROSS JOIN (SELECT count(promoCode) AS promotionals FROM promotionals WHERE userid=$1 AND status='active') promotionals
      CROSS JOIN (SELECT json_agg(filtered_promos_table) as popularpromotionals
        FROM (SELECT promoCode FROM promotionals WHERE userid=$1 AND status='active' ORDER BY totalUsage DESC LIMIT 6) as filtered_promos_table
      ) popularpromotionals
      CROSS JOIN (SELECT count(invoice) AS credits FROM transactions WHERE userid=$1 AND status='credit' AND refundDate>=$2 AND refundDate<$3) credits
      CROSS JOIN (SELECT sum(amount) AS creditsTotal FROM transactions WHERE userid=$1 AND status='credit' AND refundDate>=$2 AND refundDate<$3) creditsTotal
      CROSS JOIN (SELECT count(invoice) AS dues FROM transactions WHERE userid=$1 AND status='due') dues
      CROSS JOIN (SELECT sum(amount) AS duesTotal FROM transactions WHERE userid=$1 AND status='due') duesTotal
      CROSS JOIN (SELECT count(invoice) AS charges FROM transactions WHERE userid=$1 AND status='paid' AND chargeDate>=$2 AND chargeDate<$3) charges
      CROSS JOIN (SELECT sum(amount) AS chargesTotal FROM transactions WHERE userid=$1 AND status='paid' AND chargeDate>=$2 AND chargeDate<$3) chargesTotal
      CROSS JOIN (SELECT count(invoice) AS refunds FROM transactions WHERE userid=$1 AND status='refund' AND refundDate>=$2 AND refundDate<$3) refunds
      CROSS JOIN (SELECT sum(amount) AS refundsTotal FROM transactions WHERE userid=$1 AND status='refund' AND refundDate>=$2 AND refundDate<$3) refundsTotal
      CROSS JOIN (SELECT count(sentDate) AS messages FROM messages WHERE userid=$1 AND sentDate>=$2 AND sentDate<$3) messages
      CROSS JOIN (SELECT count(templateName) AS activetemplates FROM templates WHERE userid=$1 AND status='active') activetemplates
      CROSS JOIN (SELECT count(templateName) AS inactivetemplates FROM templates WHERE userid=$1 AND status='suspended') inactivetemplates
    `,
};

const feedbackQueries = {
  userFeedback:
    'INSERT INTO feedback(company, email, reason) VALUES ($1, $2, $3)',
};

const messageQueries = {
  createMessageTransaction:
    'INSERT INTO messages(userid, template, fromSender, subject, sentDate, plans) VALUES((SELECT id FROM users WHERE id=$1), $2, $3, $4, $5, $6)',
  deleteOneMessage: 'DELETE FROM messages WHERE userid=$1 AND id=$2',
  getMessageByKey: 'SELECT id FROM messages WHERE key=$1',
  getMessageCount: 'SELECT count(*) FROM messages WHERE userid=$1',
  getSomeMessages:
    'SELECT * FROM messages WHERE userid=$1 ORDER BY key DESC LIMIT $2 OFFSET $3',
};

const notificationQueries = {
  createNotification:
    'INSERT INTO notifications(userid, icon, message, messageDate) VALUES ((SELECT id FROM users WHERE id=$1), $2, $3, $4)',
  deleteAllNotifications:
    'UPDATE notifications SET deleted=true WHERE deleted=false AND userid=$1',
  deleteOneNotification:
    'UPDATE notifications SET deleted=true WHERE userid=$1 AND id=$2',
  getNotifcationByKey: 'SELECT id FROM notifications WHERE key=$1',
  getSomeNotifications: `
      SELECT * FROM (SELECT json_agg(x) as unreadNotifications FROM (SELECT * FROM notifications WHERE userid=$1 AND read = false AND deleted = false ORDER BY key DESC LIMIT 99) as x ) x
      CROSS JOIN (SELECT json_agg(y) as readNotifications FROM (SELECT * FROM notifications WHERE userid=$1 AND read = false AND deleted = false ORDER BY key DESC LIMIT 99) as y) y
    `,
  setReadNotifications:
    'UPDATE notifications SET read=true WHERE read=false AND userid=$1',
};

const planQueries = {
  createPlan:
    'INSERT INTO plans(userid, amount, billEvery, planName, description, setupFee, startDate) VALUES((SELECT id FROM users WHERE id=$1), $2, $3, $4, $5, $6, $7)',
  deletePlanByName:
    'DELETE FROM plans WHERE userid=$1 AND planName=$2 RETURNING *',
  deleteOnePlan: 'DELETE FROM plans WHERE userid=$1 AND id=$2 RETURNING *',
  findPlanById:
    'SELECT amount, billEvery, planName, description, setupFee, trialPeriod from plans WHERE userid=$1 and id=$2',
  findPlanByName:
    'SELECT amount,planName FROM plans WHERE userid=$1 and planName=$2',
  getAllActivePlans:
    "SELECT planName, description, amount FROM plans WHERE status='active' AND userid=$1 ORDER BY key ASC",
  getAllPlans: (userid, limit, offset, status) => `SELECT * FROM plans WHERE status='${status}' AND userid='${userid}' ORDER BY key DESC LIMIT ${limit} OFFSET ${offset};`,
  getPlanCount:
    "SELECT count(*) filter (where status = 'active' AND userid=$1) AS active, count(*) filter (where status = 'suspended' AND userid=$1) as inactive FROM plans;",
  updatePlan:
    'UPDATE plans SET amount=$3, billEvery=$4, planName=$5, description=$6, setupFee=$7, trialPeriod=$8 WHERE userid=$1 AND id=$2',
  updatePlanStatus:
    'UPDATE plans SET status=$3 WHERE userid=$1 AND id=$2 RETURNING planName',
  updatePlanSubCount:
    'UPDATE plans SET subscribers=(SELECT count(*) FROM subscribers WHERE planName=$2) WHERE planName=$2',
  selectPlan: 'SELECT * FROM plans WHERE userid=$1 AND planName=$2',
  selectPlanByKey: 'SELECT * FROM plans WHERE key=$1',
};

const promoQueries = {
  createPromotion:
    'INSERT INTO promotionals(userid, amount, maxUsage, discountType, endDate, promoCode, plans, startDate) VALUES((SELECT id FROM users WHERE id=$1), $2, $3, $4, $5, $6, $7, $8)',
  deleteOnePromotion:
    'DELETE FROM promotionals WHERE userid=$1 AND id=$2 RETURNING *',
  findPromoById: 'SELECT * from promotionals WHERE userid=$1 AND id=$2',
  getAllPromotions: (userid, limit, offset, status) => `SELECT * FROM promotionals WHERE status='${status}' AND userid='${userid}' ORDER BY key DESC LIMIT ${limit} OFFSET ${offset};`,
  getPromotionCount:
    "SELECT count(*) filter (where status = 'active' AND userid=$1) AS active, count(*) filter (where status = 'suspended' AND userid=$1) AS inactive FROM promotionals;",
  updatePromotion:
    'UPDATE promotionals SET amount=$3, maxUsage=$4, discountType=$5, endDate=$6, promoCode=$7, plans=$8, startDate=$9 WHERE userid=$1 AND id=$2',
  updatePromotionStatus:
    'UPDATE promotionals SET status=$3 WHERE userid=$1 AND id=$2 RETURNING *',
  selectPromotionCode:
    'SELECT promoCode FROM promotionals WHERE userid=$1 AND promoCode=$2',
  selectPromotionCodeByKey: 'SELECT * FROM promotionals WHERE key=$1',
  selectPromotionDetails:
    "SELECT * FROM promotionals WHERE userid=$1 AND promoCode=$2 AND plans@>$3 AND status='active' AND startDate<=$4 AND endDate>=$4",
  updatePromotionUsage:
    'UPDATE promotionals SET totalUsage = totalUsage+1 WHERE userid=$1 AND promoCode=$2 AND plans @> $3',
};

const subQueries = {
  createSubscriber: `INSERT INTO subscribers(userid, subscriber, amount, billingAddress, billingCity, billingState, billingUnit, billingZip, email, contactAddress, contactCity, contactPhone, contactState, contactUnit, contactZip, promoCode, sameBillingAddress, planName, startDate)
      VALUES((SELECT id FROM users WHERE id=$1), $2, (SELECT amount FROM plans WHERE userid=$1 AND planName=$18), $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);
      UPDATE plans SET subscribers = subscribers+1 WHERE userid=$1 and planName=$18`,
  deleteOneSubcriber: `UPDATE plans SET subscribers = subscribers-1 WHERE userid=$1 and planName=$3;
      DELETE FROM subscribers WHERE userid=$1 AND id=$2 RETURNING *`,
  findSubscriberByEmail:
    'SELECT planName FROM subscribers WHERE email=$1 and planName=$2',
  getSomeSubcribers: (userid, limit, offset, status) => `SELECT * FROM subscribers ${statusType(
    status,
    userid,
  )} ORDER BY key DESC LIMIT ${limit} OFFSET ${offset};`,
  getAllEmailsByPlan:
    'SELECT email FROM subscribers WHERE userid=$1 AND planName=$2',
  getSubscriberCount:
    "SELECT count(*) filter (WHERE status = 'active' AND userid=$1) AS active, count(*) filter (where status in ('inactive', 'suspended') and userid=$1) as inactive FROM subscribers;",
  getSubscriberId: 'SELECT id FROM subscribers WHERE userid=$1 AND email=$2',
  selectSubscriberByKey: 'SELECT * FROM subscribers WHERE key=$1',
  updateOneSubscriber:
    'UPDATE subscribers SET status=$3, enddate=$4 WHERE userid=$1 AND id=$2 RETURNING subscriber,planName',
  updateSubscriberCredits:
    'UPDATE subscribers SET credits=credits+$3 WHERE userid=$1 AND id=$2',
};

const templateQueries = {
  createTemplate:
    'INSERT INTO templates (userid, fromSender, plans, message, subject, templateName, uniqueTemplateName) VALUES((SELECT id FROM users WHERE id=$1), $2, $3, $4, $5, $6, $7)',
  deleteOneTemplate:
    'DELETE FROM templates WHERE userid=$1 AND id=$2 RETURNING *',
  findTemplateById: 'SELECT * FROM templates WHERE userid=$1 AND id=$2',
  findTemplateByName:
    'SELECT * FROM templates WHERE userid=$1 and uniqueTemplateName=$2',
  getAllActiveTemplates:
    "SELECT * FROM templates WHERE status='active' AND userid=$1 ORDER BY key ASC",
  getSomeTemplates: (userid, limit, offset, status) => `SELECT * FROM templates ${statusType(
    status,
    userid,
  )} ORDER BY key DESC LIMIT ${limit} OFFSET ${offset};`,
  getTemplateCount:
    "SELECT count(*) filter (WHERE status='active' AND userid=$1) AS active, count(*) filter (where status='suspended' and userid=$1) as inactive FROM templates;",
  updateTemplate:
    'UPDATE templates SET fromSender=$3, plans=$4, message=$5, subject=$6, templateName=$7, uniqueTemplateName=$8 WHERE userid=$1 AND id=$2 RETURNING templateName,plans',
  updateTemplateStatus:
    'UPDATE templates SET status=$3 WHERE userid=$1 AND id=$2 RETURNING templateName,plans',
  selectTemplate:
    'SELECT templateName FROM templates WHERE userid=$1 AND uniqueTemplateName=$2',
};

const transactQueries = {
  createTransaction: `INSERT INTO transactions(userid, status, planName, email, subscriber, processor, amount, chargeDate)
    VALUES((SELECT id FROM users WHERE id=$1), $2, $3, $4, $5, $6, $7, $8);`,
  deleteOneTransactaction:
    'DELETE FROM transactions WHERE userid=$1 AND id=$2 RETURNING *',
  getSomeTransactactions: (userid, limit, offset, status) => `SELECT * FROM transactions ${statusType(
    status,
    userid,
  )} ORDER BY key DESC LIMIT ${limit} OFFSET ${offset};`,
  getTransactionCount:
    "SELECT count(*) filter (where status in ('paid', 'due') AND userid=$1) AS charges, count(*) filter (where status in ('refund', 'credit') AND userid=$1) AS refunds FROM transactions;",
  refundTransaction:
    'INSERT INTO transactions(userid, status, planName, email, subscriber, processor, amount, refundDate) VALUES((SELECT id FROM users WHERE id=$1), $2, $3, $4, $5, $6, $7, $8);',
  selectTransactionById:
    'SELECT email,planname,processor,subscriber FROM transactions WHERE userid=$1 AND id=$2',
};

module.exports = {
  ...adminQueries,
  ...avatarQueries,
  ...authQueries,
  ...dashboardQueries,
  ...feedbackQueries,
  ...messageQueries,
  ...notificationQueries,
  ...planQueries,
  ...promoQueries,
  ...subQueries,
  ...templateQueries,
  ...transactQueries,
};
