const cron = require('node-cron');
const vehicleModel = require('../models/vehicle');
const http = require('http');
const request = (data, host, path, method) => {
    return new Promise((resolve, reject) => {
        // An object of options to indicate where to post to
        const post_options = {
            host: host,
            path: path,
            method: method,
            headers: { 'Content-Type': 'application/json'}
        };

        // Set up the request
        const post_req = http.request(post_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                resolve(chunk);
            });
        });
        // post the data
        post_req.write(data);
        post_req.end();
    });

}
let uploading = () => {
    vehicleModel.find({uploaded: 0}, (err, docs) => {
        if(docs.length) {
            const data = JSON.stringify(docs);
            request(data, 'wispy-bird-8767.getsandbox.com', '/cars', 'POST')
                .then((response) => {
                    docs.map((v) => {
                        vehicleModel.findOneAndUpdate(
                            {sellingId: v.sellingId},
                            {$set: {uploaded: 1}},
                            {new: true},
                            (error, doc) => {console.log(doc)});
                    })

                });
        }
    });
};
module.exports = () => {
    uploading();
    cron.schedule('* * * * *', () => {
        uploading();
    });
};