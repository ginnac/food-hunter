module.exports = function(sequelize, DataTypes) {
    var Reviews = sequelize.define("Reviews", {
      app_review: DataTypes.INTEGER,
      app_restaurant: DataTypes.INTEGER,
    });
    Reviews.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Reviews.belongsTo(models.Restaurants, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Reviews;
  };