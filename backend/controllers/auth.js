const { response } = require('express');

const CrearProveedor = (req, resp = response)=>{
    resp.json({
        ok: true,
        msg: 'registro'
    });
};

module.exports = {
    CrearProveedor
};
