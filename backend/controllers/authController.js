const passport = require('passport')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')

const User = require('../models/user')

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err
    if (!user) res.send('No User Exists')
    else {
      req.logIn(user, (err) => {
        if (err) throw err
        res.send('Successfully Authenticated')
        // console.log(req.user)
      })
    }
  })(req, res, next)
}

// Validate the user's input and register a new user
exports.register = [
  // Validate and sanitize fields.
  body('username', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('email', 'Email must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('fullName', 'Full name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .optional({ checkFalsy: true }),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.send(errors.array())
      return
    } else {
      // Data from form is valid.
      // Check if User with same username already exists.
      User.findOne({ username: req.body.username }).exec((err, foundUser) => {
        if (err) {
          return next(err)
        }

        if (foundUser) {
          // User exists, redirect to its detail page.
          res.send('User already exists')
        } else {
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
              return next(err)
            }
            const user = new User({
              username: req.body.username,
              password: hashedPassword,
              email: req.body.email,
              fullName: req.body.fullName,
              // role: req.body.role,
              // membership: req.body.membership,
              // createdAt: req.body.registeredSince,
            }).save((err) => {
              if (err) {
                return next(err)
              }
              res.send('User created successfully')
            })
          })
        }
      })
    }
  },
]

// Logout - destroys the session
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.send('User Logged out')
  })
}

exports.user = (req, res) => {
  res.send(req.user)
  // TIP: Once authenticated, the user is stored in the req.user object, which contains all the session data. This can be used and called at absolutely any time, anywhere in the application, even if the user refreshes the page.
}
