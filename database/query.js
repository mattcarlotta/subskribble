module.exports = app => {
  const statusType = status => (status.length > 1 ? `WHERE status='${status[0]}' OR status='${status[1]}'` : `WHERE status='${status[0]}'`);

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
    deleteOnePlan: () => ("DELETE FROM plans WHERE id=$1 AND userid=$2 RETURNING *"),
    getAllPlans: (userid, limit, offset, status) => (`SELECT * FROM plans WHERE status='${status}' AND userid='${userid}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
    getPlanCount: () => (
      "SELECT count(*) filter (where status = 'active' AND userid=$1) AS active, count(*) filter (where status = 'suspended' AND userid=$1) as inactive FROM plans;"
    ),
    updateOnePlan: () => ("UPDATE plans SET status=$1 WHERE id=$2 AND userid=$3 RETURNING planName")
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

  const subQueries = {
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
    ...authQueries,
    ...notificationQueries,
    ...planQueries,
    ...promoQueries,
    ...subQueries,
    ...transactQueries
  }
}
