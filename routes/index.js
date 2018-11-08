var express = require('express');
const Feedback = require('../models/feedback');
let router = express.Router();
// let Recaptcha = require('express-recaptcha').Recaptcha;

//import Recaptcha from 'express-recaptcha'
// let recaptcha = new Recaptcha('6LfODHkUAAAAAI5r_ZHjGpbcaiktuEz7YTRE4Abh', '6LfODHkUAAAAAORGVeYTTrmdmELJlpR4nf__jmX9');

/* GET home page. */
// middleware:, recaptcha.middleware.render 
//, captcha:res.recaptcha 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

/* POST Upload EndPoint. */
router.post('/upload', function(req, res, next) {
  console.log(req.body);
  let date = new Date(Date.now());
  let feedback = new Feedback({
    lname: req.body.lanme,
    tel: req.body.tel,
    email: req.body.email,
    desc: req.body.comment,
    date: date
  });
  feedback.save(function (err) {
    console.log(err);
  });
  res.send('Thanks!');
});


module.exports = router;
