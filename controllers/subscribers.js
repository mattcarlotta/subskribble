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
      const query = "SELECT * FROM subscribers"
      const subscribers = await db.any(query);
      res.status(201).json({ subscribers });
    } catch (err) {
      return res.status(500).json({ err })
    }
  }

  return controller;
}
