module.exports = function(sequelize, DataTypes) {
  var Restaurants = sequelize.define("Restaurants", {
    name: DataTypes.STRING,
    zip_code: DataTypes.INTEGER,
    kind_food: DataTypes.String
  });
  return Restaurants;
};
