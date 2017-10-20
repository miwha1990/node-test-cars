
const crudRouter = require('../../routes/CRUD'),
      VehicleModel = require('../../models/vehicle');

module.exports =  (app) => {
    app.use('/api/vehicle', crudRouter(app, VehicleModel, true));
};