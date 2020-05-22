
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('roles').select().then(roles => {
      return knex('users').insert([
        {username: 'admin', email: 'favoritedogs1234@gmail.com', emailPassword:'gmailPassword1234', password: '$2b$12$.tjyrPKElO5S30pmQ9oF7eRWFnTqHfPlCflPcZvU3Rhpjb/W1iyBW', role_id: roles[0].id},
        {username: 'user', email: 'dorofteicristina19@gmail.com', password: '$2b$12$.tjyrPKElO5S30pmQ9oF7eRWFnTqHfPlCflPcZvU3Rhpjb/W1iyBW', role_id: roles[2].id},

      ]);
      })



};
