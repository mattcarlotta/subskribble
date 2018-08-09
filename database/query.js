module.exports = app => {
  const statusType = status => (status.length > 1 ? `WHERE status='${status[0]}' OR status='${status[1]}'` : `WHERE status='${status[0]}'`);

  const adminQueries = {
    setUserAsAdmin: () => ("UPDATE users SET isGod=true WHERE id=$1")
  }

  const avatarQueries = {
    getAvatarToken: () => ("SELECT token,userid FROM avatars WHERE userid=$1")
  }

  const authQueries = {
    createNewUser: () => ("INSERT INTO users(email, password, firstName, lastName, company, token) VALUES ($1, $2, $3, $4, $5, $6)"),
    deleteUserAccount: () => ("DELETE FROM users WHERE id=$1 AND email=$2 AND company=$3 RETURNING *"),
    getCurrentUserDetails: () => ("SELECT email, company, firstName, lastName FROM users WHERE id=$1"),
    getUserDetails: () => ("SELECT id, company, collapsesidenav, email, firstname, isgod, lastname FROM users WHERE email=$1"),
    getUserPassword: () => ("Select password FROM users WHERE id=$1"),
    findCompany: () => ("SELECT company FROM users WHERE company=$1"),
    findUserByEmail: () => ("SELECT id, email, firstName, lastName, password, verified FROM users WHERE email=$1"),
    findUserById: () => ("SELECT * FROM users WHERE id=$1"),
    findUserByToken: () => ("SELECT * FROM users WHERE token=$1"),
    resetToken: () => ("UPDATE users SET token=$1 WHERE email=$2"),
    updateCompanyName: () => ("UPDATE users SET company=$2 WHERE id=$1"),
    updateEmailAddress: ()=> ("UPDATE users SET email=$2, token=$3, verified=false WHERE id=$1"),
    updateUserName: () => ("UPDATE users SET firstName=$2, lastName=$3 WHERE id=$1"),
    updateUserPassword: () => ("UPDATE users SET password=$2 WHERE id=$1"),
    updateSidebarState: () => ("UPDATE users SET collapseSideNav=$2 WHERE id=$1"),
    verifyEmail: () => ("UPDATE users SET verified=true WHERE email=$1")
  }

  const feedbackQueries = {
    userFeedback: () => ("INSERT INTO feedback(company, email, reason) VALUES ($1, $2, $3)")
  }

  const planQueries = {
    createPlan: () => ("INSERT INTO plans(userid, amount, billEvery, planName, description, setupFee) VALUES((SELECT id FROM users WHERE id=$1), $2, $3, $4, $5, $6)"),
    deletePlanByName: () => ("DELETE FROM plans WHERE userid=$1 AND planName=$2 RETURNING *"),
    deleteOnePlan: () => ("DELETE FROM plans WHERE userid=$1 AND id=$2 RETURNING *"),
    findPlanById: () => ("SELECT amount, billEvery, planName, description, setupFee, trialPeriod from plans WHERE userid=$1 and id=$2"),
    getAllActivePlans: () => (`SELECT planName, description, amount FROM plans WHERE status='active' AND userid=$1 ORDER BY key ASC`),
    getAllPlans: (userid, limit, offset, status) => (`SELECT * FROM plans WHERE status='${status}' AND userid='${userid}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
    getPlanCount: () => (
      "SELECT count(*) filter (where status = 'active' AND userid=$1) AS active, count(*) filter (where status = 'suspended' AND userid=$1) as inactive FROM plans;"
    ),
    updatePlan: () => ("UPDATE plans SET amount=$3, billEvery=$4, planName=$5, description=$6, setupFee=$7, trialPeriod=$8 WHERE userid=$1 AND id=$2"),
    updatePlanStatus: () => ("UPDATE plans SET status=$1 WHERE id=$2 AND userid=$3 RETURNING planName"),
    updatePlanSubCount: () => ("UPDATE plans SET subscribers=(SELECT count(*) FROM subscribers WHERE planName=$2) WHERE planName=$2"),
    selectPlan: () => ("SELECT * FROM plans WHERE userid=$1 AND planName=$2")
  }

  const promoQueries = {
    applyPromotion: () => ("SELECT * from promotionals WHERE userid=$1 and promocode=$2"),
    createPromotion: () => ("INSERT INTO promotionals(userid, amount, dateStamps, discountType, endDate, promoCode, plans, maxUsage, startDate) VALUES((SELECT id FROM users WHERE id=$1), $2, $3, $4, $5, $6, $7, $8, $9)"),
    deleteOnePromotion: () => ("DELETE FROM promotionals WHERE id=$1 AND userid=$2 RETURNING *"),
    findPromoById: () => ("SELECT * from promotionals WHERE userid=$1 AND id=$2"),
    getAllPromotions: (userid, limit, offset, status) => (`SELECT * FROM promotionals WHERE status='${status}' AND userid='${userid}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
    getPromotionCount: () => (
      "SELECT count(*) filter (where status = 'active' AND userid=$1) AS active, count(*) filter (where status = 'suspended' AND userid=$1) as inactive FROM promotionals;"
    ),
    updatePromotion: () => ("UPDATE promotionals SET amount=$3, dateStamps=$4, discountType=$5, endDate=$6, promoCode=$7, plans=$8, maxUsage=$9, startDate=$10 WHERE userid=$1 AND id=$2"),
    updatePromotionStatus: () => ("UPDATE promotionals SET status=$1 WHERE id=$2 AND userid=$3 RETURNING promoCode"),
    selectPromotionCode: () => ("SELECT promoCode FROM promotionals WHERE userid=$1 AND promoCode=$2"),
    selectPromotionDetails: () => ("SELECT amount,discountType FROM promotionals WHERE userid=$1 AND promoCode=$2 AND plans @> $3 and status='active'")
  }

  const notificationQueries = {
    createNotification: () => ("INSERT INTO notifications(userid, message) VALUES ($1, $2)"),
    deleteAllNotifications: () => ("DELETE FROM notifications WHERE userid=$1"),
    deleteOneNotification: () => ("DELETE FROM notifications WHERE userid=$1 AND id=$2"),
    getSomeNotifications: () => (`
      (SELECT array_to_json(array_agg(row_to_json(x)))
      from ((SELECT * FROM notifications WHERE READ = false AND userid=$1 LIMIT 99)) x)
      UNION ALL
      SELECT array_to_json(array_agg(row_to_json(y)))
      from ((SELECT * FROM notifications WHERE READ = true AND deleted = false AND userid=$1 LIMIT 99)) y;
    `),
    setReadNotifications: () => (`UPDATE notifications SET read=true WHERE read=false AND userid=$1`)
  }

  const subQueries = {
    createSubscriber: () => (
      `INSERT INTO subscribers(userid, subscriber, amount, billingAddress, billingCity, billingState, billingUnit, billingZip, email, contactAddress, contactCity, contactPhone, contactState, contactUnit, contactZip, promoCode, sameBillingAddress, planName, startDate)
      VALUES((SELECT id FROM users WHERE id=$1), $2, (SELECT amount FROM plans WHERE userid=$1 AND planName=$18), $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);
      UPDATE plans SET subscribers = subscribers+1 WHERE userid=$1 and planName=$18
      `
    ),
    deleteOneSubcriber: () => (`
      UPDATE plans SET subscribers = subscribers-1 WHERE userid=$1 and planName=$3;
      DELETE FROM subscribers WHERE userid=$1 AND id=$2 RETURNING *
    `),
    findSubscriberByEmail: () => ("SELECT planName FROM subscribers WHERE email=$1 and planName=$2"),
    getSomeSubcribers: (userid, limit, offset, status) => (`SELECT * FROM subscribers ${statusType(status)} AND userid='${userid}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
    getSubscriberCount: () => (
      "SELECT count(*) filter (WHERE status = 'active' AND userid=$1) AS active, count(*) filter (where status in ('inactive', 'suspended') and userid=$1) as inactive FROM subscribers;"
    ),
    updateOneSubscriber: () => ("UPDATE subscribers SET status=$1, enddate=$2 WHERE id=$3 AND userid=$4 RETURNING subscriber")
  }

  const templateQueries = {
    createTemplate: () => ( `INSERT INTO templates (userid, fromSender, plans, message, subject, templateName, uniqueTemplateName) VALUES((SELECT id FROM users WHERE id=$1), $2, $3, $4, $5, $6, $7)`),
    deleteOneTemplate: () => ("DELETE FROM templates WHERE id=$1 AND userid=$2 RETURNING *"),
    findTemplateById: () => ("SELECT * from templates WHERE userid=$1 AND id=$2"),
    getSomeTemplates: (userid, limit, offset, status) => (`SELECT * FROM templates ${statusType(status)} AND userid='${userid}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
    getTemplateCount: () => (
      "SELECT count(*) filter (WHERE status='active' AND userid=$1) AS active, count(*) filter (where status='suspended' and userid=$1) as inactive FROM templates;"
    ),
    updateTemplate: () => ("UPDATE templates SET fromSender=$3, plans=$4, message=$5, subject=$6, templateName=$7, uniqueTemplateName=$8 WHERE userid=$1 AND id=$2 RETURNING templateName"),
    updateTemplateStatus: () => ("UPDATE templates SET status=$1 WHERE id=$2 AND userid=$3 RETURNING templateName"),
    selectTemplate: () => ("SELECT templateName FROM templates WHERE userid=$1 AND uniqueTemplateName=$2")
  }

  const transactQueries = {
    deleteOneTransactaction: () => ("DELETE FROM transactions WHERE id=$1 AND userid=$2 RETURNING *"),
    getSomeTransactactions: (userid, limit, offset, status) => (`SELECT * FROM transactions ${statusType(status)} AND userid='${userid}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
    getTransactactionCount: () => (
      "SELECT count(*) filter (where status in ('paid', 'due') AND userid=$1) AS charges, count(*) filter (where status in ('refund', 'credit') AND userid=$1) AS refunds FROM transactions;"
    ),
  }

  return {
    ...adminQueries,
    ...avatarQueries,
    ...authQueries,
    ...feedbackQueries,
    ...notificationQueries,
    ...planQueries,
    ...promoQueries,
    ...subQueries,
    ...templateQueries,
    ...transactQueries
  }
}
