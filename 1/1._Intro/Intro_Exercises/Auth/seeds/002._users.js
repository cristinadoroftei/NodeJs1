
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('roles').select().then(roles => {
      return knex('users').insert([
        {username: 'admin', password: '$2y$12$Zi8VDk38RRvAoMrDVoTW3Ogeo6TGOJLHWYF5yThLxRJUe.TOingLS', role_id: roles[0].id}
      ]);
      })



};
