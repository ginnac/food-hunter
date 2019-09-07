var db = require("../models");
var nodemailer = require('nodemailer');
var userEmail;
var groupId;

module.exports = function (app) {
  // Get all experiences
  app.get("/api/groups", function (req, res) {
    db.Experiences.findAll({}).then(function (dbExperiences) {
      res.json(dbExperiences);
    });
  });

  app.post("/api/email/:id/:email", function (req, res) {
    console.log(req.params.email);
    userEmail = req.params.email;
    groupId = req.params.id;
    console.log
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'foodhunter.noreply@gmail.com',
        pass: 'food-hunter*'
      }
    });
    var urlReview = "http://localhost:3003/get-review/" + groupId;
    var mailOptions = {
      from: 'foodhunter.noreply@gmail.com',
      to: userEmail,
      subject: 'Food Hunter - How was your exprerience?',
      text: 'Thanks for used Food Hunter!',
      html: '<p>Click <a href="' + urlReview + '">here</a> to give us your review</p>'
      // html: '<p>Click <a href="http://localhost:3003/get-review/' + groupId + ">here</a> to give us your review</p>"
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

  // PUT route for updating posts
  app.post("/api/review/:id", function (req, res) {
    db.Reviews.create(req.body).then(function (dbReviews) {
      res.json(dbReviews);
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