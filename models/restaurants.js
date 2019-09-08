module.exports = function(sequelize, DataTypes) {
  var Restaurants = sequelize.define("Restaurants", {
    name: DataTypes.STRING,
    kind_food: DataTypes.STRING,
    address: DataTypes.STRING,
    zip_code: DataTypes.INTEGER,
    photo: DataTypes.STRING
    
  });
  Restaurants.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Restaurants.hasMany(models.Reviews, {
      onDelete: "cascade"
    });
  };
  return Restaurants;
};
