// express server setup
require('dotenv').config()
const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const geoJSONs = require('./models/geojson');
const connect = mongoose.connect(process.env.MONGOURI,{ useNewUrlParser: true,useUnifiedTopology: true });
connect.then(()=>{
  console.log('connected to database');
}).catch((err)=>{
  console.log("ERROR in connecting to DATABASE",err);
})


// middleware
const app = express();
app.use(
    cors({
      origin: [/localhost/, /127\.0\.0\.1/, /0\.0\.0\.0/],
    })
  );
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
})

app.get('/api', async (req, res) => {
    try {
    const data = await geoJSONs.find();
    res.status(200).json(data);
    }
    catch (err) {
    res.status(500).json({ error: err });
    }
})
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    }
);