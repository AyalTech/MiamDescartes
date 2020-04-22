const jwtServices = require('../services/jwt.services');

const isAuthenticated = (db) => async (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'Pas de token, authorisation refusé !' });

  try {
    // Verify token
    const decodedToken = jwtServices.verify(token, process.env.SECRETUSER);
    const  user = await db.User.findOne({
      where: {
        id : decodedToken.user
      }
    });
    if (user) {
      // Add user from payload
      req.user = decodedToken;
      next()
    }
    else {
      return res.status(401).json({ msg: 'Token invalide, authorisation refusé !' });
    }
  } catch (e) {
    res.status(400).json({ msg: 'Le token n\'est pas valide' });
  }
}

const isAdmin = (db) => async (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'Pas de token, authorisation refusé !' });

  try {
    // Verify token
    const decodedToken = jwtServices.verify(token, process.env.SECRETUSER);
    const  user = await db.User.findOne({
      where: {
        id : decodedToken.user
      }
    });

    if(!user.isAdmin)
      return res.status(401).json({ msg: 'Vous n\'êtes pas administrateur !' });

    if (user) {
      // Add user from payload
      req.user = decodedToken;
      next()
    }
    else {
      return res.status(401).json({ msg: 'Token invalide, authorisation refusé !' });
    }
  } catch (e) {
    res.status(400).json({ msg: 'Le token n\'est pas valide' });
  }
}

module.exports = {isAuthenticated, isAdmin};
