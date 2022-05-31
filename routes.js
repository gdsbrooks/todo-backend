const { any } = require('joi');
const Joi = require('joi')

const connection = require('./knexfile')[process.env.DB_CONNECTION || 'development'];
const database = require('knex')(connection)



const Routes =
    [
        {
            method: 'GET',
            path: '/todos',
            options: {
                cors: true,
                description: 'Get Todos',
                notes: 'Retrieves all todos. Optionally filters by state (All/Complete/Incomplete) and orders by description / created_at / completed_at',
                tags: ['api'],
                validate: {
                    query: Joi.object({
                        filter: Joi.string()
                            .only().allow('all', 'complete', 'incomplete')
                            .description('optional filter by status - all [default], complete, incomplete. '),
                        orderBy: Joi.string()
                            .optional()
                            .only().allow('createdAt', 'completedAt', 'description')
                            .description('optional sort criteria - createdAt [default], completedAt or description.')
                    }),

                },
                handler: (request, h) => {

                    const filter = request.query.filter || null;
                    let filterBool = (filter === 'complete')
                        ? [1]
                        : (filter === 'incomplete')
                            ? [0]
                            : [0, 1]

                    // const orderMethods = ['createdAt', 'completedAt', 'description']
                    // const orderBy = request.query.orderBy
                    // let orderSequence = (orderBy === 'completedAt')
                    //     ? [orderMethods[1], orderMethods[0], orderMethods[2]]
                    //     : (orderBy === 'description')
                    //         ? [orderMethods[2], orderMethods[0], orderMethods[1]]
                    //         : orderMethods

                    //Could not reliably implement ordering.







                    return database('todos').whereIn('isComplete', filterBool)
                    // .orderBy(orderSequence) - could not make order work
                }
            }

        },
        {
            method: 'POST',
            path: '/todos',

            options: {
                cors: true,
                description: 'Post New Todo',
                notes: 'adds a new todo with the description entered. Todo is stored with and id, created_at date, completed_at data(null) and state(incomplete)',
                tags: ['api'],
                validate: {
                    payload: Joi.object({
                        todoText: Joi.string()
                            .required()
                            .description('the description of  the new todo item')
                    }),
                },
                handler: (request, h) => {
                    return database('todos')
                        .insert(request.payload, ['*']) //Adds todo and returns all rows as a response
                }
            }
        },
        {
            method: 'PATCH',
            path: '/todo/{id}',
            options: {
                cors: true,
                description: 'Update Todo',
                notes: 'Can modify state to complete or update the description. If todo state is complete, it will reject with HTTP error code 400',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.number()
                            .required()
                            .description('the id for the todo item to modify')
                    }),
                    payload: Joi.object({
                        isComplete: Joi.boolean(),
                        todoText: Joi.string()
                    })
                },
                handler: (request, h) => {
                    const {isComplete, todoText} = request.payload
                    return database('todos')
                        .where({ id: request.params.id })
                        .update({isComplete, todoText}, ['*'])

                }
            }
        },
        {
            method: 'DELETE',
            path: '/todo/{id}',
            options: {
                cors: true,
                description: 'Delete Todo',
                notes: 'Removes specificed Todo from database',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.number()
                            .required()
                            .description('the id for the todo item to delete')
                    }),
                },
                handler: (request, h) => {
                    return database('todos')
                        .where('id', request.params.id)
                        .del()

                }
            }
        },
        {
            method: 'GET',
            path: '/docs',
            options: {
                cors: true,
                description: 'API Docs',
                notes: 'redirects to hapi-swagger autogenerated API documentation',
                tags: ['util'],
                handler: (request, h) => {

                    return h.redirect('/documentation')

                }
            }
        },
        {
            method: '*',
            path: '/{any*}',
            options: {
                cors: true,
                description: '404 Error Response',
                notes: 'Response whenever the requested route is not found',
                tags: ['util'],
                handler: (request, h) => {
                    return h.response('Error 404: Oh no! That couldn\'t be found').code(404)
                }
            }
        }
    ]

module.exports = Routes  