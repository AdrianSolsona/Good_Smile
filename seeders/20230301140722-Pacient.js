
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert('Pacients', [
      {id: 1, user_id: 1,
        createdAt: "2023-02-22 00:00:00", updatedAt: 
        "2023-02-22 00:00:00"},

      {id: 2, user_id: 3,
        createdAt: "2023-02-22 00:00:00", 
        updatedAt: "2023-02-22 00:00:00"}
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
