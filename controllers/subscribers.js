const db = require('../db/config');

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
    try {
      const activesubscribers = await db.any(
        "SELECT id, key, status, email, subscriber, plan, startdate, enddate, amount FROM activesubscribers LIMIT 10"
      );
      let activesubscriberscount = await db.any(
        "SELECT COUNT(*) FROM activesubscribers"
      )
      activesubscriberscount = parseInt(activesubscriberscount[0].count, 10);
      const inactivesubscribers = await db.any(
        "SELECT id, key, status, email, subscriber, plan, startdate, enddate, amount FROM inactivesubscribers LIMIT 10"
      );
      let inactivesubscriberscount = await db.any(
        "SELECT COUNT(*) FROM inactivesubscribers"
      )
      inactivesubscriberscount = parseInt(inactivesubscriberscount[0].count, 10);
      res.status(201).json({ activesubscribers, activesubscriberscount, inactivesubscribers, inactivesubscriberscount });
    } catch (err) {
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
