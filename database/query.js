module.exports = app => {
  const statusType = status => (status.length > 1 ? `WHERE status='${status[0]}' OR status='${status[1]}'` : `WHERE status='${status[0]}'`);

  const promoQueries = {
    deleteOnePromotion: () => ("DELETE FROM promotionals WHERE id=$1 RETURNING *"),
    getAllPromotions: (limit, offset, status) => (`SELECT * FROM promotionals WHERE status='${status}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
    getPromotionCount: () => (
      "SELECT count(*) filter (where status = 'active') AS active, count(*) filter (where status = 'suspended') as inactive FROM promotionals;"
    ),
    updateOnePromotion: () => ("UPDATE promotionals SET status=$1 WHERE id=$2 RETURNING promoCode, planName")
  }

  const planQueries = {
    deleteOnePlan: () => ("DELETE FROM plans WHERE id=$1 RETURNING *"),
    getAllPlans: (limit, offset, status) => (`SELECT * FROM plans WHERE status='${status}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
    getPlanCount: () => (
      "SELECT count(*) filter (where status = 'active') AS active, count(*) filter (where status = 'suspended') as inactive FROM plans;"
    ),
    updateOnePlan: () => ("UPDATE plans SET status=$1 WHERE id=$2 RETURNING planName")
  }

  const notificationQueries = {
    deleteAllNotifications: () => ("DELETE FROM notifications WHERE userid=$1"),
    deleteOneNotification: () => ("DELETE FROM notifications WHERE id=$1 AND userid=$2"),
    getSomeNotifications: () => (`
      (SELECT array_to_json(array_agg(row_to_json(x)))
      from ((SELECT * FROM notifications WHERE READ = false AND userid=$1 LIMIT 99)) x)
      UNION ALL
      SELECT array_to_json(array_agg(row_to_json(y)))
      from ((SELECT * FROM notifications WHERE READ = true AND deleted = false AND userid=$1 LIMIT 99)) y;
    `),
    updateOneNotification: () => (`UPDATE notifications SET read=true WHERE read=false AND userid=$1`)
  }

  const subQueries = {
    deleteOneSubcriber: () => ("DELETE FROM subscribers WHERE id=$1 RETURNING *"),
    getSomeSubcribers: (limit, offset, status) => (`SELECT * FROM subscribers ${statusType(status)} ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
    getSubscriberCount: () => (
      "SELECT count(*) filter (where status = 'active') AS active, count(*) filter (where status in ('inactive', 'suspended')) as inactive FROM subscribers;"
    ),
    updateOneSubscriber: () => ("UPDATE subscribers SET status=$1, enddate=$2 WHERE id=$3 RETURNING subscriber")
  }

  const transactQueries = {
    deleteOneTransactaction: () => ("DELETE FROM transactions WHERE id=$1 RETURNING *"),
    getSomeTransactactions: (limit, offset, status) => (`SELECT * FROM transactions ${statusType(status)} ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
    getTransactactionCount: () => (
      "SELECT count(*) filter (where status in ('paid', 'due')) AS charges, count(*) filter (where status in ('refund', 'credit')) AS refunds FROM transactions;"
    ),
  }

  const userQueries = {
    createNewUser: () => ("INSERT INTO users(email, password, firstName, lastName, token) VALUES ($1, $2, $3, $4, $5)"),
    findUserByEmail: () => ("SELECT * FROM users WHERE email=$1"),
    findUserById: () => ("SELECT * FROM users WHERE id=$1"),
  }

  return {
    ...notificationQueries,
    ...planQueries,
    ...promoQueries,
    ...subQueries,
    ...transactQueries,
    ...userQueries
  }
}
