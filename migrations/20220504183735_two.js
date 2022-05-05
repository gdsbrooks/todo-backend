/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('todos', table => {
        table.increments('id'); 
        table.string('description'); 
        table.enu('state', ['complete', 'incomplete']).defaultTo('incomplete');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('completedAt')
    });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function (knex) {
return knex.schema.dropTableIfExists('todos');
};
