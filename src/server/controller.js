const data = require('../database/data.json');

module.exports = {
  getData(req, res) {
    console.log('getData invoked!');
    res.send(data[0]);
  }
}