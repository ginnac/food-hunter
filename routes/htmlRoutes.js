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

   // Load example page and pass in an example by id
   app.get("/restaurant/:id", function(req, res) {
    db.Restaurants.findOne({ where: { id: req.params.id } }).then(function(dbRestaurants) {
      res.render("restaurant", {
        restaurants: dbRestaurants,
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
