module.exports = function(sequelize, DataTypes) {
    var Experiences = sequelize.define("Experiences", {
      number_eaters: DataTypes.INTEGER,
      group_name: DataTypes.STRING,
      email: DataTypes.STRING,
      zipcode: DataTypes.INTEGER,
      app_rewiew: DataTypes.INTEGER,
      experience: DataTypes.STRING,
      choosen_rest: DataTypes.STRING
    });
    return Experiences;
  };