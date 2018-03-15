const db = require('../db/config');

const query = {
  subs: (table, limit, offset) => (`SELECT id, key, status, email, subscriber, plan, startdate, enddate, amount FROM ${table} LIMIT ${limit} OFFSET ${offset};`),
  subcount: (table) => (`ANALYZE ${table}; SELECT reltuples AS estimate FROM pg_class WHERE relname = '${table}';`)
}

const parseStringToNum = str => (parseInt(str, 10));

module.exports = app => {
  const controller = {
    // APP methos
    index: (req, res) => _index(req,res),
    fetchRecords: (req, res) => _fetchRecords(req, res),
    fetchCounts: (req, res) => _fetchCounts(req, res)
    // create: (req, res) => _create(req,res)
    // show: (req, res) => _show(req,res)
    // update: (req, res) => _update(req,res)
    // delete: (req, res) => _delete(req, res)
  }

  const _index = async (req, res) => {
    const table1 = 'activesubscribers';
    const table2 = 'inactivesubscribers';
    try {
      const activesubscribers = await db.any(query.subs(table1, 10, 0));
      const inactivesubscribers = await db.any(query.subs(table2, 10, 0));

      res.status(201).json({ activesubscribers, inactivesubscribers });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  const _fetchRecords = async (req, res) => {
    let activesubscribers, inactivesubscribers;
    let { table, page, sortByNum } = req.query;
    page = parseStringToNum(page);
    sortByNum = parseStringToNum(sortByNum);
    try {
      const subscribers = await db.any(query.subs(table, sortByNum, page*sortByNum));
      (table === "activesubscribers") ? activesubscribers = subscribers : inactivesubscribers = subscribers;
      res.status(201).json({ activesubscribers, inactivesubscribers });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  const _fetchCounts = async (req, res) => {
    const table1 = 'activesubscribers';
    const table2 = 'inactivesubscribers';
    try {
      const activesubscriberscount = await db.any(query.subcount(table1));
      const inactivesubscriberscount = await db.any(query.subcount(table2));
      res.status(201).json({
        activesubscriberscount: activesubscriberscount[0].estimate,
        inactivesubscriberscount: inactivesubscriberscount[0].estimate
      });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  return controller;
}
