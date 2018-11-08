var express = require('express');
var router = express.Router();
const path = require('path');
const User = require('../models/user');
const passport = require('passport');
const LocaStrategy = require('passport-local').Strategy

passport.use('local-login', new LocaStrategy(function (username, password, done) {
  User.findOne({
    username: username
  }, function (err, user) {
    if (err) {
      console.log('-------------err-----------');
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        message: "Incorrect Username."
      })
    }
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Incorrect password.'
      });
    }
    return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/signup', function (req, res) {
  console.log(req.body);
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const username = req.body.username;
  const pass = req.body.pass;
  const re_pass = req.body.re_pass;

  let message = "";

  if (pass != re_pass) {
    message = '!same';
  } else {
    let date = new Date(Date.now());
    let user = new User({
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      password: pass
    });
    console.log(user);

    user.save(function (err) {
      console.log(err);
    });
    message = 'OK';
  }
  res.send(message);
});

router.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, '/../views/signup.html'));
});

router.post('/signin',
  passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: false
  })
);

router.get('/signin', function (req, res) {
  res.sendFile(path.join(__dirname, '/../views/signin.html'));
});


router.get('/signout', function(req, res){
  req.logout();
  res.redirect('/');
});


module.exports = router;
