var express = require('express');
const Feedback = require('../models/feedback');
let router = express.Router();
let multer = require('multer');
let Recaptcha = require('express-recaptcha').Recaptcha;

//import Recaptcha from 'express-recaptcha'
let option = {
  // 'theme': 'dark',
  'hl': 'fa'
};
// let recaptcha = new Recaptcha('6LfODHkUAAAAAI5r_ZHjGpbcaiktuEz7YTRE4Abh', '6LfODHkUAAAAAORGVeYTTrmdmELJlpR4nf__jmX9', option);
let recaptcha = new Recaptcha('6LeecXkUAAAAAKaEOQFMISXgTiyIgOwLYp7g8TaF', '6LeecXkUAAAAAOehr0U952ibmCCOFxllUedOH3z9');

let fileFilter = function (req, file, cb) {
  // supported image file mimetypes
  let allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

  if (allowedMimes.includes(file.mimetype)) {
    // allow supported image files
    cb(null, true);
  } else {
    // throw error for invalid files
    cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'));
  }
};

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/feedbacks/images/')
  },
  filename: function (req, file, cb) {
    // console.log('In storage :D');
    // console.log(file);
    // console.log(req.body);
    cb(null, Date.now() + file.originalname);
  }
})

let upload = multer({
  storage: storage,
  limits: {
    fileSize: 20971520, //20 MB
    files: 1
  },
  fileFilter: fileFilter
})


/* GET home page. */
// middleware:, recaptcha.middleware.render 
//, captcha:res.recaptcha 
router.get('/', recaptcha.middleware.render, function (req, res, next) {
  res.render('index', {
    title: 'Sinada',
    captcha: res.recaptcha
  });
});

/* POST Upload EndPoint. */
//, recaptcha.middleware.verify

router.post('/upload', upload.single('attach'), function (req, res, next) {
  // console.log(req.recaptcha.error);
  console.log(req.body);
  recaptcha.verify(req, function (error, data) {
    if (error) {
      res.send('Restricted!');
      return false;
    }

    let date = new Date(Date.now());
    let feedback = new Feedback({
      lname: req.body.lanme,
      tel: req.body.tel,
      email: req.body.email,
      desc: req.body.comment,
      date: date,
      img: req.file.filename
    });

    feedback.save(function (err) {
      console.log(err);
    });

    res.send('Thanks!');

  });
});

module.exports = router;