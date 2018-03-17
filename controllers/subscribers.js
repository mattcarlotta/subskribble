const parseStringToNum = str => (parseInt(str, 10));

const statusType = status => (status.length > 1 ? `WHERE status='${status[0]}' OR status='${status[1]}'` : `WHERE status='${status[0]}'`);

const query = {
  subs: (limit, offset, status) => (`SELECT id, key, status, email, subscriber, plan, startdate, enddate, amount FROM subscribers ${statusType(status)} LIMIT ${limit} OFFSET ${offset};`),
  subcount: (status) => (`SELECT count(*) AS estimate FROM subscribers ${statusType(status)};`)
}

module.exports = app => {
  const { db } = app.database;
  const moment = app.get("moment");

  const controller = {
    // APP methos
    index: (req, res) => _index(req,res),
    fetchRecords: (req, res) => _fetchRecords(req, res),
    fetchCounts: (req, res) => _fetchCounts(req, res),
    // create: (req, res) => _create(req,res)
    // show: (req, res) => _show(req,res)
    update: (req, res) => _update(req,res)
    // delete: (req, res) => _delete(req, res)
  }

  const _index = async (req, res) => {
    try {
      const activesubscribers = await db.any(query.subs(10, 0, ['active']));
      const inactivesubscribers = await db.any(query.subs(10, 0, ['inactive', 'suspended']));
      res.status(201).json({ activesubscribers, inactivesubscribers });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  const _fetchRecords = async (req, res) => {
    let { table, limit, page } = req.query;
    limit = parseStringToNum(limit);
    const offset =  parseStringToNum(page) * limit;
    const status = table === 'activesubscribers' ? ['active'] : ['inactive', 'suspended'];

    try {
      let activesubscribers, inactivesubscribers;
      const subscribers = await db.any(query.subs(limit, offset, status));

      (table === "activesubscribers") ? activesubscribers = subscribers : inactivesubscribers = subscribers;

      res.status(201).json({ activesubscribers, inactivesubscribers });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  const _fetchCounts = async (req, res) => {
    try {
      const activesubscriberscount = await db.any(query.subcount(['active']));
      const inactivesubscriberscount = await db.any(query.subcount(['inactive', 'suspended']));

      res.status(201).json({
        activesubscriberscount: parseStringToNum(activesubscriberscount[0].estimate),
        inactivesubscriberscount: parseStringToNum(inactivesubscriberscount[0].estimate)
      });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  const _update = async (req, res) => {
    const { id } = req.params;
    const { updateType } = req.body;
    const endDate = moment().format("MMM DD, YYYY");
    try {
      await db.none(`UPDATE subscribers SET status=$1, enddate=$2 WHERE id=$3`, [updateType, endDate, id])
      res.status(201).json({ message: `Succesfully ${updateType} the subscriber!` });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }

    // const table1 = 'activesubscribers';
    // const table2 = 'inactivesubscribers';
    // try {
    //   const activesubscriberscount = await db.any(query.subcount(table1));
    //   const inactivesubscriberscount = await db.any(query.subcount(table2));
    //   res.status(201).json({
    //     activesubscriberscount: activesubscriberscount[0].estimate,
    //     inactivesubscriberscount: inactivesubscriberscount[0].estimate
    //   });
    // } catch (err) {
    //
    // }
  }

  return controller;
}
