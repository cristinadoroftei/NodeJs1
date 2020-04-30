
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('roles').select().then(roles => {
      return knex('users').insert([
        {username: 'testUser', password: 'testPassword', role_id: roles[0].id}
      ]);
      })



};
