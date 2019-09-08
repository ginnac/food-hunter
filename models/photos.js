module.exports = function(sequelize, DataTypes) {
    var Photos = sequelize.define("Photos", {
      restaurant_type: DataTypes.STRING,
      urls_array: DataTypes.TEXT
    });
    return Photos;
  };