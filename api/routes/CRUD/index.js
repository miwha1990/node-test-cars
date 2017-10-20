const express = require('express');

module.exports = (app, Model, pagination) => {
    const router = express.Router();

    function prepareResp (success, message, data) {
        return {
            success: !!success,
            msg: message,
            data: data,
        }
    }
    router.get('/count_all', (req, res, next) => {
        Model.count((err, _entity) => {
                if (err) {
                    return res.status(400).json(prepareResp(0, 'Error!', err));
                }
                res.status(200).json(prepareResp(1, 'Total number', _entity));
            })
    });
    router.get('/', (req, res) => {
        Model.find((err, _entity) => {
            if (err) {
                return res.status(400).json(prepareResp(0, 'Error!', err));
            }
            res.status(200).json(prepareResp(1, 'Listed all', _entity));
        });
    });

    router.get('/:id', (req, res, next) => {
        Model.findById(req.params.id, (err, _entity) => {
            if (err) {
                return res.status(400).json(prepareResp(0, 'Error!', err));
            }
            res.status(200).json(prepareResp(1, 'Listed one', _entity));
        });
    });

    router.post('/', (req, res, next) => {console.log(req.body, '!!!body');
        const entity = new Model(req.body);
        entity.save(function (err, _entity) {
            if (err) {
                return res.status(400).json(prepareResp(0, 'Error!', err));
            }
            res.status(200).json(prepareResp(1, "Created", _entity));
        });
    });

    router.delete('/:id', (req, res, next) => {
        Model.findById(req.params.id).remove( (err, _entity) => {
            if (err){
                return res.status(400).json(prepareResp(0, 'Error!', err));
            }
            res.json(prepareResp(1, "Deleted", _entity));
        });
    });

    router.put('/:id', function(req ,res, next) {
        Model.findByIdAndUpdate(req.params.id,  req.body, {new:true,runValidators:true}, function(err, _entity){
            if (err){
                return res.status(400).json(prepareResp(0, 'Error!!!', err));
            }
            res.status(200).json(prepareResp(1, "Updated", _entity));
        })
    });

    return router;
};