
var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
      res.render("index",{});
   
  });

  // Load survey page and until cover all number of eaters
  app.get("/survey/:groupName", function(req, res) {
    db.Experiences.findOne({ where: { group_name: req.params.groupName } }).then(function(dbExperiences) {
      res.render("survey", {
        experiences: dbExperiences,
      });
    });
  });


  // Load survey page and until cover all number of eaters
  app.get("/restaurant/:groupName", function(req, res) {
    db.Experiences.findOne({ where: { group_name: req.params.groupName } }).then(function(dbExperiences) {
      res.render("restaurant", {
        experiences: dbExperiences,
      });
    });
  });


   // Load restaurant page and pass in as the result
   app.get("/restaurant/:groupname/:id", function(req, res) {
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
