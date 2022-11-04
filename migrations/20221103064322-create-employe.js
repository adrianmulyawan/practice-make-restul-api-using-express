'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employe_name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      employe_role: {
        allowNull: false,
        type: Sequelize.ENUM('engineer', 'hrd', 'analis')
      },
      employe_phone_number: {
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      employe_address: {
        allowNull: true,
        type: Sequelize.STRING(225)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employes');
  }
};