const { server } = require('@hapi/hapi');
const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Routes = require('./routes');

const init = async () => {

    const server = new Hapi.Server({
        port: 5000,
        host: 'localhost'
    });

    server.route(Routes);

    await server.start();
    console.log('Hapi server is running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();