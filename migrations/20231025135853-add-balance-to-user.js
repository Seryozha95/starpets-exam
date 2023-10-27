'use strict';

module.exports = {
  up: async (queryInterface) => {
    // Insert a new user into the "Users" table
    return queryInterface.bulkInsert('Users', [{
      balance: 10000, // Set the initial balance for the new user
      createdAt: new Date(),
      updatedAt: new Date(),
      // Add other user properties as needed
    }], {});
  },

  down: async (queryInterface) => {
    // Remove the user you inserted in the "down" function if necessary
    return queryInterface.bulkDelete('Users', null, {});
  }
};