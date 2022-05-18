/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()
  await knex('todos').insert([
    {id: 100, todoText: 'Learn SQL', isComplete: false,},
    {id: 101, todoText: 'Rewrite the awful Knex Documentation', isComplete: false},
    {id: 102, todoText: 'Make meaningful commits', isComplete: true}
  ]);
};
