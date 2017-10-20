const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    env = require('./api/config/environments'),
    fillDatabase = require('./api/services/fillDatabase'),
    cronService = require('./api/services/cronUploader'),
    port = process.env.PORT || 8000;
    mongooseCredentials = process.env.MONGODB || env.username ? `${env.username}:${env.password}@` : '';

//Database
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${mongooseCredentials}localhost/MONGODB`);

// parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit:'100Mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit:50000
}));
cronService();
//controllers
const VehicleController = require('./api/controllers/vehicle');
VehicleController(app);

app.get('/api', (req, res) => {
    res.send('API is running');
});
app.get('/init', fillDatabase);

const server = app.listen(port, () => {
    const address = server.address(),
     host = address.address,
     port = address.port;
     console.error('Server started at %s:%s', host, port);
});