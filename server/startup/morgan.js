// HTTP request logger middleware for node.js
const morgan = require("morgan");

module.exports = function(app) {
  app.use(morgan('dev', 'immediate'));
};
