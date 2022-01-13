const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://linux:LALO14629@cluster0.pdafw.mongodb.net/DB_articulos?retryWrites=true&w=majority")
    .then(db => console.log('Base de datos Conectada'))
    .catch(err => console.error(err));

   



    