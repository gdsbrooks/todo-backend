/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()
  await knex('todos').insert([
    {id: 100, description: 'Learn SQL', state: 'incomplete',},
    {id: 101, description: 'Rewrite the awful Knex Documentation', state: 'incomplete'},
    {id: 102, description: 'Make meaningful commits', state: 'complete'}
  ]);
};
