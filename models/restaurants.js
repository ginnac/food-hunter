module.exports = function(sequelize, DataTypes) {
  var Restaurants = sequelize.define("Restaurants", {
    name: DataTypes.STRING,
    kind_food: DataTypes.STRING,
    address: DataTypes.STRING,
    zip_code: DataTypes.INTEGER,
    photo: DataTypes.STRING
    
  });
  return Restaurants;
};
