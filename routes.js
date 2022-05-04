const Joi = require('joi')
const { customAlphabet } = require('nanoid/non-secure')

const nanoid = customAlphabet('1234567890abcdef', 10)

const Routes =
    [
        {
            method: 'GET',
            path: '/todos',
            options: {
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

                    //default values for filter and orderBy if not specified.
                    const filter = request.query.filter || 'all';
                    const orderBy = request.query.orderBy || 'createdAt';

                    return `These are where all the todos go. <br> filter: ${filter}, order: ${orderBy}`
                }
            }
        },
        {
            method: 'POST',
            path: '/todos',

            options: {
                description: 'Post New Todo',
                notes: 'adds a new todo with the description entered. Todo is stored with and id, created_at date, completed_at data(null) and state(incomplete)',
                tags: ['api'],
                validate: {
                    payload: Joi.object({
                        description: Joi.string()
                            .required()
                            .description('the description of  the new todo item')
                    }),
                },
                handler: (request, h) => {
                    const todoDescription = request.payload

                    const newTodo = {
                        id: nanoid(),
                        description: todoDescription.description,
                        createdAt: new Date().toISOString(),
                        state: false,
                        completedAt: null
                    }
                    return newTodo
                }
            }
            // Schema for full response object
            //  Joi.object({
            //         id: Joi.string()
            //             .required()
            //             .alphanum()
            //             .length(10),
            //         description: Joi.string()
            //             .required(),
            //         createdAt: Joi.date()
            //             .required(),
            //         state: Joi.boolean()
            //             .required(),
            //         completedAt: Joi.date()
            //             .optional()
            //     })
        },
        {
            method: 'PATCH',
            path: '/todo/{id}',
            options: {
                description: 'Update Todo',
                notes: 'Can modify state to complete or update the description. If todo state is complete, it will reject with HTTP erro code 400',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string()
                            .length(10)
                            .required()
                            .description('the id for the todo item to modify')
                    }),
                    payload: Joi.object({
                        state: Joi.boolean(),
                        description: Joi.string()
                    })
                },
                handler: (request, h) => {

                    const patchTodo = request.params.id
                    const updatedTodo = request.payload

                    return `${patchTodo} - ${updatedTodo.description}`

                }
            }
        },
        {
            method: 'DELETE',
            path: '/todo/{id}',
            options: {
                description: 'Delete Todo',
                notes: 'Removes specificed Todo from database',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string()
                            .required()
                            .length(10)
                            .description('the id for the todo item to delete')
                    }),
                },
                handler: (request, h) => {

                    const deleteTodo = request.params.id

                    return `${deleteTodo} successfully deleted. BE GONE!`
                }
            }
        },
        {
            method: 'GET',
            path: '/docs',
            options: {
                description: 'API Docs',
                notes: 'redirects to hapi-swagger autogenerated API documentation',
                tags: ['helper'],
                handler: (request, h) => {

                    return h.redirect('/documentation')

                }
            }
        },
        {
            method: '*',
            path: '/{any*}',
            options: {
                description: '404 Error Response',
                notes: 'Response whenever the requested route is not found',
                tags: ['helper'],
                handler: (request, h) => {
                    return h.response('Error 404: Oh no! That couldn\'t be found').code(404)
                }
            }
        }
    ]

module.exports = Routes  