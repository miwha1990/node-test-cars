'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VehicleSchema = new Schema({
    sellingId: {
        type: String,
        Required: 'Enter 6 character id',
        max: 6,
        unique: true
    },
    brand: {
        type: String,
        Required: 'Enter vehicle brand name'
    },
    model:{
        type: String,
        Required: 'Enter vehicle model name'
    },
    title:{
        type: String,
        Required: 'Enter title for the offer'
    },
    price: {
        type: Number,
        default: 0
    },
    uploaded: {
        type: Number,
        default: 0
    }
});
module.exports =  mongoose.model('Vehicle', VehicleSchema);