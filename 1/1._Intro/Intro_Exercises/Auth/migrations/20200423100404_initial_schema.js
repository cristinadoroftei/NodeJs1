
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
        table.string('email').notNullable()
        table.string('email_password')
        table.string('password').notNullable()
        table.integer('age')


        table.integer('role_id').unsigned().notNullable()
        table.foreign('role_id').references('id').inTable('roles');

        table.timestamp('updated_at')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })

    .createTable('dogs', (table) => {
        table.increments('id')
        table.string('breed').notNullable().unique()
        table.string('description').notNullable()
        table.string('imageUrl').notNullable()
    })
};


exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('roles')
    .dropTableIfExists('dogs')
};
