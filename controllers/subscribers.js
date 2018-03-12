const db = require('../db/config');

module.exports = app => {
  const controller = {
    // APP methos
    index: (req, res) => _index(req,res)
    // create: (req, res) => _create(req,res)
    // show: (req, res) => _show(req,res)
    // update: (req, res) => _update(req,res)
    // delete: (req, res) => _delete(req, res)
  }

  const _index = async (req, res) => {
    try {
      const activesubscribers = await db.any(
        "SELECT id, key, status, email, subscriber, plan, startdate, enddate, amount FROM subscribers WHERE status = 'active' GROUP BY key"
      );
      const inactivesubscribers = await db.any(
        "SELECT id, key, status, email, subscriber, plan, startdate, enddate, amount FROM subscribers WHERE status = 'inactive' OR status = 'suspended' GROUP BY key"
      );
      res.status(201).json({ activesubscribers, inactivesubscribers });
    } catch (err) {
      return res.status(500).json({ err })
    }
  }

  return controller;
}
