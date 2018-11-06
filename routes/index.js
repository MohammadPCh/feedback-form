var express = require('express');
const Feedback = require('../models/feedback');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
