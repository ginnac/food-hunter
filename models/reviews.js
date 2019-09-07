module.exports = function(sequelize, DataTypes) {
    var Reviews = sequelize.define("Reviews", {
      app_review: DataTypes.INTEGER,
      app_restaurant: DataTypes.INTEGER,
      restaurant_name: DataTypes.STRING
    });
    return Reviews;
  };