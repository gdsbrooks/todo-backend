const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Joi = require('joi');
const Routes = require('./routes');


const init = async () => {

    const server = new Hapi.Server({
        port: 5005,
        host: 'localhost'
    });

    const swaggerOptions = {
        info: {
                title: 'Todo App API Documentation - George Brooks',
                version: '0.1',
            },
        };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.route(Routes);

    await server.start();
    console.log('Hapi server is running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log('err', err);
    process.exit(1);
});

init();
