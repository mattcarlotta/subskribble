const db = require('../db/config');

const query = {
  subs: (table) => (`SELECT id, key, status, email, subscriber, plan, startdate, enddate, amount FROM ${table} LIMIT 10;`),
  subcount: (table) => (`ANALYZE ${table}; SELECT reltuples AS estimate FROM pg_class WHERE relname = '${table}';`)
}


module.exports = app => {
  const controller = {
    // APP methos
    index: (req, res) => _index(req,res),
    fetchRecords: (req, res) => _fetchRecords(req, res)
    // create: (req, res) => _create(req,res)
    // show: (req, res) => _show(req,res)
    // update: (req, res) => _update(req,res)
    // delete: (req, res) => _delete(req, res)
  }

  const _index = async (req, res) => {
    const table1 = 'activesubscribers';
    const table2 = 'inactivesubscribers';
    try {
      const activesubscribers = await db.any(query.subs(table1));

      let activesubscriberscount = await db.any(query.subcount(table1));
      activesubscriberscount = activesubscriberscount[0].estimate;

      const inactivesubscribers = await db.any(query.subs(table2));

      let inactivesubscriberscount = await db.any(query.subcount(table2))
      inactivesubscriberscount =  inactivesubscriberscount[0].estimate;

      res.status(201).json({ activesubscribers, activesubscriberscount, inactivesubscribers, inactivesubscriberscount });
    } catch (err) {
      console.log('server err', err)
      return res.status(500).json({ err })
    }
  }

  const _fetchRecords = async (req, res) => {
    let activesubscribers, inactivesubscribers;
    let { table, page, sortByNum } = req.query;
    page = parseInt(page, 10);
    sortByNum = parseInt(sortByNum, 10);
    try {
      const subscribers = await db.any(
        `SELECT id, key, status, email, subscriber, plan, startdate, enddate, amount FROM ${table} LIMIT ${sortByNum} OFFSET ${page*sortByNum} `
      );
      (table === "activesubscribers") ? activesubscribers = subscribers : inactivesubscribers = subscribers;
      res.status(201).json({ activesubscribers, inactivesubscribers });
    } catch (err) {
      return res.status(500).json({ err })
    }
  }

  return controller;
}
