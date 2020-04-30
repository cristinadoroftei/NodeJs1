
//DML = manipulate = SELECT, UPDATE, DELETE
//DDL = definition = CREATE, DROP


exports.up = function(knex) {
  return knex.schema
  .createTable('roles', (table) => {
    table.increments('id').notNullable();
    table.string('role').unique().notNullable()
})
    .createTable('users', (table) => {
        table.increments('id')
        table.string('username').unique().notNullable()
        table.string('password').notNullable()
        table.integer('age')


        table.integer('role_id').unsigned().notNullable()
        table.foreign('role_id').references('id').inTable('roles');

        table.timestamp('updated_at')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

[roles]
// id role

[users]
// id username ... role_id

[electives]
//id elective_name user_id

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('roles')
};
