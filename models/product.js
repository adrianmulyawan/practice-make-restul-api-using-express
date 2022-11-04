'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    category_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'products'
  });
  Products.associate = (models) => {
    Products.belongsTo(models.Categories, {
      foreignKey: 'category_id',
      as: 'Categories'
    });
  };
  return Products;
};