module.exports = app => {
  const statusType = status => (status.length > 1 ? `WHERE status='${status[0]}' OR status='${status[1]}'` : `WHERE status='${status[0]}'`);

  const adminQueries = {
    setUserAsAdmin: () => ("UPDATE users SET isGod=true WHERE id=$1")
  }

  const authQueries = {
    createNewUser: () => ("INSERT INTO users(email, password, firstName, lastName, token) VALUES ($1, $2, $3, $4, $5)"),
    findUserByEmail: () => ("SELECT * FROM users WHERE email=$1"),
    findUserById: () => ("SELECT * FROM users WHERE id=$1"),
    findUserByToken: () => ("SELECT * FROM users WHERE token=$1"),
    resetToken: () => ("UPDATE users SET token=$1 WHERE email=$2"),
    updateUserPassword: () => ("UPDATE users SET password=$1 WHERE id=$2"),
    updateSidebarState: () => ("UPDATE users SET collapseSideNav=$1 WHERE id=$2"),
    verifyEmail: () => ("UPDATE users SET verified=true WHERE email=$1")
  }

  const planQueries = {
    createPlan: () => ("INSERT INTO plans(userid, planName, amount) VALUES((SELECT id FROM users WHERE id=$1), $2, $3)"),
    deletePlanByName: () => ("DELETE FROM plans WHERE userid=$1 AND planName=$2 RETURNING *"),
    deleteOnePlan: () => ("DELETE FROM plans WHERE id=$1 AND userid=$2 RETURNING *"),
    getAllActivePlans: () => (`SELECT planName FROM plans WHERE status='active' AND userid=$1 ORDER BY key ASC`),
    getAllPlans: (userid, limit, offset, status) => (`SELECT * FROM plans WHERE status='${status}' AND userid='${userid}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
    getPlanCount: () => (
      "SELECT count(*) filter (where status = 'active' AND userid=$1) AS active, count(*) filter (where status = 'suspended' AND userid=$1) as inactive FROM plans;"
    ),
    updateOnePlan: () => ("UPDATE plans SET status=$1 WHERE id=$2 AND userid=$3 RETURNING planName"),
    updatePlanSubCount: () => ("UPDATE plans SET subscribers=(SELECT count(*) FROM subscribers WHERE planName=$2) WHERE planName=$2"),
    selectPlan: () => ("SELECT * FROM plans WHERE planName=$1")
  }

  const promoQueries = {
    deleteOnePromotion: () => ("DELETE FROM promotionals WHERE id=$1 AND userid=$2 RETURNING *"),
    getAllPromotions: (userid, limit, offset, status) => (`SELECT * FROM promotionals WHERE status='${status}' AND userid='${userid}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
    getPromotionCount: () => (
      "SELECT count(*) filter (where status = 'active' AND userid=$1) AS active, count(*) filter (where status = 'suspended' AND userid=$1) as inactive FROM promotionals;"
    ),
    updateOnePromotion: () => ("UPDATE promotionals SET status=$1 WHERE id=$2 AND userid=$3 RETURNING promoCode, planName")
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

  const subformQueries = {
    createForm: () => ( `INSERT INTO forms (userid, name, plans, uniqueFormName) VALUES((SELECT id FROM users WHERE id=$1), $2, $3, $4)`),
    deleteOneForm: () => ("DELETE FROM forms WHERE id=$1 AND userid=$2 RETURNING *"),
    getSomeForms: (userid, limit, offset, status) => (`SELECT * FROM forms ${statusType(status)} AND userid='${userid}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
    getFormCount: () => (
      "SELECT count(*) filter (WHERE status='active' AND userid=$1) AS active, count(*) filter (where status='suspended' and userid=$1) as inactive FROM forms;"
    ),
    updateOneForm: () => ("UPDATE forms SET status=$1 WHERE id=$2 AND userid=$3 RETURNING formName"),
    selectForm: () => ("SELECT name FROM forms WHERE userid=$1 AND uniqueFormName=$2")
  }

  const subQueries = {
    createSubscriber: () => (
      `INSERT INTO subscribers (userid, subscriber, address, addressCity, addressState, addressZip, email, phone, planName, amount)
      VALUES((SELECT id FROM users WHERE id=$1), $2, $3, $4, $5, $6, $7, $8, $9, (SELECT amount FROM plans WHERE planName=$9))`
    ),
    deleteOneSubcriber: () => ("DELETE FROM subscribers WHERE id=$1 AND userid=$2 RETURNING *"),
    getSomeSubcribers: (userid, limit, offset, status) => (`SELECT * FROM subscribers ${statusType(status)} AND userid='${userid}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
    getSubscriberCount: () => (
      "SELECT count(*) filter (WHERE status = 'active' AND userid=$1) AS active, count(*) filter (where status in ('inactive', 'suspended') and userid=$1) as inactive FROM subscribers;"
    ),
    updateOneSubscriber: () => ("UPDATE subscribers SET status=$1, enddate=$2 WHERE id=$3 AND userid=$4 RETURNING subscriber")
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
    ...authQueries,
    ...notificationQueries,
    ...planQueries,
    ...promoQueries,
    ...subformQueries,
    ...subQueries,
    ...transactQueries
  }
}
