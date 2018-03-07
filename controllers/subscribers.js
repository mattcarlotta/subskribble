module.exports = app => {
  const db = app.db;

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
      const query = "SELECT * subscribers ORDER BY key DESC FETCH FIRST 10 ROWS ONLY"
      const data = db.none(query);
      res.status(201).json({ data });
    } catch (err) {
      return res.status(500).json({ err })
    }
  }

  return controller;
}
