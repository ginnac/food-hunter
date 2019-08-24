module.exports = function(sequelize, DataTypes) {
    var Experiences = sequelize.define("Experiences", {
      group_name: DataTypes.STRING,
      app_rewiew: DataTypes.INTEGER,
      experience: DataTypes.String,
      choosen_rest: DataTypes.String
    });
    return Experiences;
  };