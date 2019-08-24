var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/groups", function(req, res) {
    db.Experiences.findAll({}).then(function(dbExperiences) {
      res.json(dbExperiences);
    });
  });

  // Create a new example
  app.post("/api/groups", function(req, res) {
    console.log(req.body);
    db.Experiences.create(req.body).then(function(dbExperiences) {
      res.json(dbExperiences);
    });
  });

  // Delete an example by id
  app.delete("/api/experiences/:id", function(req, res) {
    db.Experiences.destroy({ where: { id: req.params.id } }).then(function(dbExperiences) {
      res.json(dbExperiences);
    });
  });
};
