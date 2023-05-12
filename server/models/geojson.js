const mongoose = require('mongoose');

const geoJsonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Feature'],
        required: true,
      },
      properties: {
        fill: String,
      },
      geometry: {
        type: {
          type: String,
          enum: ['Polygon'],
          required: true,
        },
        coordinates: {
          type: [[[Number]]],
          required: true,
        },
      },
});

const collectionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['FeatureCollection'],
        required: true,
      },
      features: [geoJsonSchema],
})

var geoJSONs =  mongoose.model('geoJSON',collectionSchema);
module.exports = geoJSONs;