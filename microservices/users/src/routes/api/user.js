const utilService = require('../../services/util.services')
const jwtService = require('../../services/jwt.services')
const auth = require('../../middleware/isAuthenticated');

const validateEmail = require('../../helpers/reguex.js');
const transporter = require('../../constants/transporter');
const _ = require('lodash')
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (app, db) => {
  app.post('/auth', async (req, res) => {
    try {
      const {firstName, lastName, email, password, confirmPassword} = req.body;
      if(!firstName || !lastName || !email || !password) {
        return res.status(400).json({ msg: "Tout les champs doient être remplis !"})
      }

      if (password !== confirmPassword){
        return res.status(400).json({ msg: "Les deux mot de passe ne correspondent pas !"})
      }

      const user = await db.User.findOne({
        where: {
          email,
        },
      })

      if (user) {
        return res.status(400).json({ msg: "Ces identifiants sont déjà associés à un compte mail, connectez-vous avec vos identifiants !"})
      }

      if(!validateEmail(email)) {
        return res.status(400).json({ msg: "Le format de l'adresse email est incorrect !"})
      }

      else {
        const encryptedPassword = await utilService.hashPassword(password);

        const user = await db.User.create({
          firstName,
          lastName,
          email,
          password: encryptedPassword
        })

        await jwt.sign(
          {
            user: _.pick(user, 'id')
          },
          process.env.SECRETEMAIL,{
            expiresIn: '1 day'
          },
          (err, emailToken) => {
            try {
              let url = '';
              if (process.env.NODE_ENV == "production")
                url = `${process.env.URL}/confirmation/${emailToken}`;
              else
                url = `http://localhost:4000/confirmation/${emailToken}`;
              transporter.sendMail({
                to: email,
                subject: "Confirmation du mail",
                html: `<p>Cliquez sur ce <a href="${url}">lien</a> pour confirmer votre adresse mail </p>`
              })
            }
            catch(err) {
              return res.status(500).json({
                err
              })
            }
          });

        return res.json({
          msg: "Il ne vous reste plus qu'à valider votre adresse mail pour vous connecter !"
        })
      }

    }
    catch(err) {
      return res.status(500).json({
        err
      })
    }
  })
  app.get('/confirmation/:token', async (req,res) => {
    try {
      const { user: { id } } = jwtService.verify(req.params.token, process.env.SECRETEMAIL);
      await db.User.update({ confirmed: true }, {
        where: {
          id
        }
      });
      if (process.env.NODE_ENV === 'production') return res.redirect(`${process.env.URL}`);
      else return res.redirect('http://localhost:3000/');

    } catch (err) {
      res.status(500).json({
        err
      })
    }
  })
  app.post('/login', async (req,res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ msg: "Tout les champs doient être remplis !"})
      }

      const user = await db.User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        return res.status(400).json({ msg: "Cet email n'est associé à aucun compte !" })
      }

      if(!user.confirmed){
        return res.status(400).json({ msg: "Confirmez votre adresse mail pour pouvoir vous connecter !" })
      }

      const matched = await utilService.comparedPassword(password, user.password);

      if (matched) {
        // create a json webtoken for user
        const token = await jwtService.issue({
          user: user.id
        }, '1 day', process.env.SECRETUSER)

        const msgSuccess = `Le compte associé au mail ${email} est bien connecté au site, vous êtes prêt à commander !`

        return res.json({
          user,
          token,
          msg: msgSuccess,
        });
      }
      else {
        return res.status(400).json({ msg: "Ce mot de passe ne correspond pas à cet email !" })
      }
    }
    catch(err) {
      return res.status(500).json({ err })
    }
  })
// @route   GET login/forgetPassword
// @desc    Update password
// @access  Public
  app.post('/login/forgetPassword', async (req, res) => {
    try {
      const { email, password, confirmPassword } = req.body ;
      if (!email) {
        return res.status(400).json({ msg: "Veuillez entrez un email !"})
      }
      if (password !== confirmPassword){
        return res.status(400).json({ msg: "Les deux mot de passe ne correspondent pas !"})
      }

      const user = await db.User.findOne({
        where: {
          email
        }
      })

      if (!user) return res.status(400).json({ msg: "Cet email n'existe pas !"})


      const encryptedPassword = await utilService.hashPassword(password);
      await db.User.update({
        password: encryptedPassword
      }, {
        where: {
          email
        }
      })
      return res.json({
        msg: "Mot de passe mis à jour !"
      })
    }
    catch(err) {
      return res.status(500).json({ err })
    }
  })
// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
  app.get('/user', auth.isAuthenticated(db), async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          id: req.user.user
        }
      })

      if (!user) {
        return res.status(404).json({
          msg: "Ce user n'existe pas !"
        })
      }

      res.json({
        user,
      })
    }
    catch(err) {
      res.status(500).json({
        err
      })
    }
  });
}
