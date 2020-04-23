
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'testUser', password: 'testPassword', role_id: 1}
      ]);
};
