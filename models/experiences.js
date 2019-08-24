module.exports = function(sequelize, DataTypes) {
    var Experiences = sequelize.define("Experiences", {
      group_name: DataTypes.STRING,
      app_rewiew: DataTypes.INTEGER,
      experience: DataTypes.STRING,
      choosen_rest: DataTypes.STRING
    });
    return Experiences;
  };