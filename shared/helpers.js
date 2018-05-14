module.exports = {
  parseStringToNum: str => (parseInt(str, 10)),
  sendError: (err, res, done) => {
    return res.status(500).json({ err: err.toString() })
    done();
  }
}
