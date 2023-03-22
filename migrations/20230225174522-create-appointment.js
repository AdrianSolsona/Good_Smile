'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pacient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Pacients",
          key: "id"
        }
      },
      dentist_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Dentists",
          key: "id"
        }
      },
      treatment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Treatments",
          key: "id"
        }
      },
      status: {
        type: Sequelize.STRING
      },
      observations: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Appointments');
  }
};