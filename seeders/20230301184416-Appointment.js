'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert('Appointments', [
      {id: 1,
        pacient_id : 1,
        dentist_id: 1,
        treatment_id : 1,
        status: "pending",
        observations: "hola que tal",
        date: "2023-03-01 00:00:00",
        createdAt: "2023-02-22 00:00:00", 
        updatedAt: "2023-02-22 00:00:00"
      },
      {id: 2,
        pacient_id : 2,
        dentist_id: 2,
        treatment_id : 2,
        status: "complete",
        observations: "hola que tal como te va",
        date: "2023-03-01 00:00:00", 
        createdAt: "2023-02-22 00:00:00", 
        updatedAt: "2023-02-22 00:00:00"
      }
  ], {});
  }, 

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
