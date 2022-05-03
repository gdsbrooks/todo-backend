const { server } = require('@hapi/hapi');
const Hapi = require('@hapi/hapi')

const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            // GET all TODOS
        }
    });

    server.route({
        method: 'GET',
        path: '/todos?filter?orderBy',
        handler: (request, h) => {

            //  GET /todos?filter=<STATE>&orderBy=<FIELD></FIELD>
        }
    });

    server.route({
        method: 'POST',
        path: '/todos',
        handler: (request, h) => {

            //POST a new TODO';
        }
    })

    server.route({
        method: 'PATCH',
        path: '/todo/{id}',
        handler: (request, h) => {

            // PATCH {id}
        }
    })

    server.route({
        method: 'DELETE',
        path: '/todo/{id}',
        handler: (request, h) => {

            // DELETE {id}
        }
    })

    server.route({
        method: 'GET',
        path: '/docs',
        handler: (request, h) => {

            // GET docs - hapi-swagger
        }
    })
    await server.start();
    console.log('Hapi server is running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();