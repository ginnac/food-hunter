var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
      res.render("index",{});
   
  });

  // Load survey page and until cover all number of eaters
  app.get("/survey/:id", function(req, res) {
    db.Experiences.findOne({ where: { id: req.params.id } }).then(function(dbExperiences) {
      res.render("survey", {
        experiences: dbExperiences,
      });
    });
  });

<<<<<<< HEAD
  // Load example page and pass in an example by id
  app.get("/survey/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("survey", {
        example: dbExample
=======
   // Load example page and pass in an example by id
   app.get("/restaurant/:id", function(req, res) {
    db.Restaurants.findOne({ where: { id: req.params.id } }).then(function(dbRestaurants) {
      res.render("restaurant", {
        restaurants: dbRestaurants,
>>>>>>> ff7ea4b1ce61242da89f1c571a14726eee983c8e
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
