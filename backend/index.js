const express = require('express');
require('dotenv').config();

/**console.log(process.env);*/

const app = express();

/** rutas */

app.use('/api/auth', require('./Routes/auth'));


app.listen(process.env.Port, () =>{
    console.log(`consola corriendo en el puerto ${ process.env.Port }`);
});
