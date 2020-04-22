const jwt = require('jsonwebtoken');

module.exports = {
  issue(payload, expiresIn, secret, cb = () => null) {
    return jwt.sign(payload, secret, {
      expiresIn:expiresIn
    }, cb())
  },
  verify(token, secret){
    return jwt.verify(token, secret);
  }
}