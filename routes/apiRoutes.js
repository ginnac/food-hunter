var db = require("../models");

module.exports = function(app) {
  // Get all experiences
  app.get("/api/groups", function(req, res) {
    db.Experiences.findAll({}).then(function(dbExperiences) {
      res.json(dbExperiences);
    });
  });

  // Create a new expereince
  app.post("/api/groups", function(req, res) {
    console.log(req.body);
    db.Experiences.create(req.body).then(function(dbExperiences) {
      res.json(dbExperiences);
    });
  });

  // Delete an experience by id
  app.delete("/api/experiences/:groupName", function(req, res) {
    db.Experiences.destroy({ where: { group_name: req.params.groupName } }).then(function(dbExperiences) {
      res.json(dbExperiences);
    });
  });



//get on experience by the group name

app.get("/api/experiences/:groupName", function(req,res){
  console.log(req.params.groupName);
  db.Experiences.findOne({
    where: {
      group_name: req.params.groupName
    },
  }).then(function(dbExperiences){
    
    res.json(dbExperiences);
    
  });
});

};