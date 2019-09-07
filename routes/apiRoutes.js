var db = require("../models");
var nodemailer = require('nodemailer');
var userEmail;

module.exports = function (app) {
  // Get all experiences
  app.get("/api/groups", function (req, res) {
    db.Experiences.findAll({}).then(function (dbExperiences) {
      res.json(dbExperiences);
    });
  });

  app.post("/api/email/:email", function (req, res) {
console.log(req.params.email);
    userEmail = req.params.email;
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'foodhunter710@gmail.com',
        pass: 'food-hunter*'
      }
    });

    var mailOptions = {
      from: 'foodhunter710@gmail.com',
      to: userEmail,
      subject: 'Please give us your opinion',
      text: 'Thanks for use Food Hunter!',
      html: '<p>Click <a href="http://www.google.com">here</a> to give us your review</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });

  // Create a new expereince
  app.post("/api/groups", function (req, res) {
    console.log(req.body);
    db.Experiences.create(req.body).then(function (dbExperiences) {
      res.json(dbExperiences);
    });
  });

  // Delete an experience by id
  app.delete("/api/experiences/:groupName", function (req, res) {
    db.Experiences.destroy({ where: { group_name: req.params.groupName } }).then(function (dbExperiences) {
      res.json(dbExperiences);
    });
  });



  //get on experience by the group name

  app.get("/api/experiences/:groupName", function (req, res) {
    console.log(req.params.groupName);
    db.Experiences.findOne({
      where: {
        group_name: req.params.groupName
      },
    }).then(function (dbExperiences) {

      res.json(dbExperiences);

    });
  });

};