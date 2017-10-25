const data = require('../database/data.json');

module.exports = {
  getData(req, res) {
    res.send(data);
  }
}