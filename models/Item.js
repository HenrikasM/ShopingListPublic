const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema

const ItemSchema = new Schema ({
    name: {
        type: String,
        required: true
    },

    date: { 
    type: Date,
    default: Date.now
    },

    userID: { 
    type: String,
    required: true
   // required: trues
     }
}); 

module.exports = item = mongoose.model('item', ItemSchema);