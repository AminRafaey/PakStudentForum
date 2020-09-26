module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    }
    catch(ex) {
      return res.status(404).send(e.message);
    }
  };  
}