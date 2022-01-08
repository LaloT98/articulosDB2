const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/DB_articulos")
    .then(db => console.log('Base de datos Conectada'))
    .catch(err => console.error(err));