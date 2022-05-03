const Routes =
    [
        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {

                // GET all TODOS
            }
        },
        {
            method: 'GET',
            path: '/todos:filter:orderBy',
            handler: (request, h) => {

                //  GET /todos?filter=<STATE>&orderBy=<FIELD></FIELD>
            }
        },
        {
            method: 'POST',
            path: '/todos',
            handler: (request, h) => {

                //POST a new TODO';
            }
        },
        {
            method: 'PATCH',
            path: '/todo/{id}',
            handler: (request, h) => {

                // PATCH {id}
            }
        },
        {
            method: 'DELETE',
            path: '/todo/{id}',
            handler: (request, h) => {

                // DELETE {id}
            }
        },
    {
            method: 'GET',
            path: '/docs',
            handler: (request, h) => {

                // GET docs - hapi-swagger
            }
        },
    ]

module.exports = Routes  