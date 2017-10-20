const vehicleModel = require('../models/vehicle');
const data = [
    {
        sellingId: 'Hfg897',
        brand: 'Ford',
        model: 'Mustang',
        title: 'New offer',
        price: 8000
    },
    {
        sellingId: '0001JK',
        brand: 'Opel',
        model: 'Cadett',
        title: 'New offer 2',
        price: 1000
    },
    {
        sellingId: '0023rT',
        brand: 'Nissan ',
        model: 'Skyline',
        title: 'New offer3',
        price: 28000
    },
    {
        sellingId: 'ZAZ001',
        brand: 'ZAZ',
        model: 'Tavria',
        title: 'New offer4',
        price: 100
    },
];
module.exports = (req, res) => {
    let I = 0;
    let myF = (I) => {
        const myModel = new vehicleModel(data[I]);
        myModel.save()
            .then(() => {
                if(data.length - 1 === I) {
                    return res.json({
                        success: true,
                        message: 'Database successfully filled'
                    });
                }
                if(data.length > I){
                    I++;
                    myF(I);
                }
            })
            .catch(err => {
                if (err) {
                    if (err.code === 11000) {
                        return res.json({
                            success: false,
                            message: 'A offer already exists',
                            err: err.errmsg
                        });
                    } else {
                        return res.json({
                            success: false,
                            message: err.code
                        });
                    }
                }
            });
    }
    myF(I);


};

