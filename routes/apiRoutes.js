var db = require("../models");

module.exports = function(app) {
  // Get all experiences
  app.get("/api/groups", function(req, res) {
    db.Experiences.findAll({}).then(function(dbExperiences) {
      res.json(dbExperiences);
    });
  });


  // Get photos url for 1 type fo food
  app.get("/api/photos/:chosenRestaurant", function(req, res) {
    db.Photos.findOne({
      where: {
      restaurant_type: req.params.chosenRestaurant
      },
    }).then(function(dbPhotos){
      
      res.json(dbPhotos);
      
    });
  });


  //find all photos
   app.get("/api/all-photos", function(req, res) {
    db.Photos.findAll({}).then(function(dbPhotos) {
      res.json(dbPhotos);
    });
  });




  //find all restaurants

  // Create a new expereince
  app.post("/api/restaurants", function(req, res) {
    console.log(req.body);
    db.Restaurants.create(req.body).then(function(dbRestaurants) {
      res.json(dbRestaurants);
    });
  });

  // Create a new expereince
  app.post("/api/groups", function(req, res) {
    console.log(req.body);
    db.Experiences.create(req.body).then(function(dbExperiences) {
      res.json(dbExperiences);
    });
  });

  // create rows with photos' urls arrays 
  app.post("/api/photos", function(req, res) {
    console.log(req.body);
    db.Photos.bulkCreate( [
      {restaurant_type: "american restaurant", urls_array: "https://tse3.mm.bing.net/th?id=OIP.LZQw_-_Sf9zHEEGm1RrG2AHaE8&pid=Api&P=0&w=240&h=161"},
      { restaurant_type: "indian restaurant", urls_array:'https://tse3.mm.bing.net/th?id=OIP.MN5TBSdP3OT7uPLz4TFELgHaFR&pid=Api&P=0&w=217&h=155'},
      { restaurant_type: "thai restaurant", urls_array: "https://tse4.mm.bing.net/th?id=OIP.7oh3a7YGR8M7G7EugI7u8wHaEK&pid=Api&P=0&w=273&h=154"},
      { restaurant_type: "chinese restaurant", urls_array: "https://tse4.mm.bing.net/th?id=OIP.dyj_KfIn7f-TbvFifCPQqAHaE8&pid=Api&P=0&w=251&h=168"},
      { restaurant_type: "greek restaurant", urls_array: "https://tse3.mm.bing.net/th?id=OIP.llN3D97kK_L1kgH7q-xufwHaF7&pid=Api&P=0&w=227&h=182"},
      { restaurant_type: "mexican restaurant", urls_array:"https://tse1.mm.bing.net/th?id=OIP.NKzHkO2kltur8D48QBNPcQHaE8&pid=Api&P=0&w=297&h=199"},
      { restaurant_type: "sushi restaurant", urls_array: "https://tse2.mm.bing.net/th?id=OIP.eyuTiJtd32sCk1Z2YaDrNQHaFj&pid=Api&P=0&w=235&h=177"},
      { restaurant_type: "italian restaurant", urls_array: "https://tse3.mm.bing.net/th?id=OIP.4XGjAavw_SPg2o5Q5Sg90AHaG-&pid=Api&P=0&w=188&h=178"}
    ], { individualHooks: true }).then(function(dbPhotos) {
      res.json(dbPhotos);
    });
  });

  // Delete an experience by id
  app.delete("/api/experiences/:groupName", function(req, res) {
    db.Experiences.destroy({ where: { group_name: req.params.groupName } }).then(function(dbExperiences) {
      res.json(dbExperiences);
    });
  });


//get all restaurants in your zipcode 

app.get("/api/reviews/:zipcode/:restaurantType", function(req,res){
  console.log(req.params.zipcode);
  console.log(req.params.restaurantType);
  db.Restaurants.findAll({
    where: {
      zip_code: req.params.zipcode,
      kind_food:req.params.restaurantType
    },
  }).then(function(dbRestaurants){
    
    res.json(dbRestaurants);
    
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