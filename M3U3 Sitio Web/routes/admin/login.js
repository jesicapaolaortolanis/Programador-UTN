var express = require('express');
var router = express.Router();
var usuarios_models = require('./../../models/usuarios_models');

router.get('/', function(req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout',
    });
});

router.post('/', async(req, res, next) => {
  try {
    //console.log para ver si se comunican el .hbs con el .js
    console.log(req.body);
    //Capturamos los datos
    var usuario = req.body.usuario;
    var password = req.body.password;

    
    var data = await usuarios_models.getUserAndPassword(usuario,password);

    if (data != undefined) {
      res.redirect('admin/novedades');
    } else{
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true,
      });
    }; //cierre else
  } catch (error) {
    console.log(error)
  }

});

module.exports = router;