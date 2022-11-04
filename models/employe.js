'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  const ENUM_VAL = ['engineer', 'hrd', 'analis'];
  Employe.init({
    employe_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Employe Name is Required"
        }
      }
    },
    employe_role: {
      type: DataTypes.ENUM,
      values: ENUM_VAL,
      allowNull: false,
      validate: {
        notNull: {msg: "Employe Role is Required"},
        isIn: {
          args: [ENUM_VAL],
          msg: 'Role must be engineer, hrd, or analis'
        }
      }
    },
    employe_phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Employe Phone Number is Required"}
      }
    },
    employe_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employe',
  });
  return Employe;
};