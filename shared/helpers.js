// module.exports = app => ({
//   parseStringToNum: str => (parseInt(str, 10)),
//   sendError: (err, res) => (res.status(500).json({ err: err.toString() }))
// })

module.exports = {
  parseStringToNum: str => (parseInt(str, 10)),
  sendError: (err, res) => (res.status(500).json({ err: err.toString() }))
}
