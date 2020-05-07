
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('roles').select().then(roles => {
      return knex('users').insert([
        {username: 'testUser2', password: '$2b$12$rsJ9o06p.Pr/fo9ncNiPg.JwNZ3hPTl54zB2Tu7G5V3mEYT6lUrvu', role_id: roles[0].id}
      ]);
      })



};
