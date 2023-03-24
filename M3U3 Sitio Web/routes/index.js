var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function(req, res, next) {

  var novedades = await novedadesModel.getNovedades();

  novedades = novedades.splice(0, 5); //Seleccionamos los primeros 5 elementos del array

    novedades = novedades.map(novedad => {
        if(novedad.img_id){
            const imagen = cloudinary.url(novedad.img_id, {
                width: 460,
                crop: 'fill',
            });

            return {
                ...novedad,
                imagen
            }

        } else {
            return {
                ...novedad,
                imagen:'/images/noimage.jpg'
            }
        }
    })

  res.render('index', {
    novedades
  });
});

router.post('/', async (req, res, next) => {
  console.log(req.body); 

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var ciudad = req.body.ciudad;
  var email = req.body.email;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'ortolanisjp@gmail.com',
    subject: 'Contacto desde la web',
    html: nombre + " " + apellido + " " + "de la ciudad " + "" + ciudad+ " le escribio a traves de la pagina Amigurumis y quiere mas info a este correo: "+ email + "." + " Y realizo el comentario: " + mensaje + "." 
  };


  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth:{
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });

  var info = await transport.sendMail(obj);

res.render('index', {
  message: "¡Mensaje enviado con éxito!",
});

});


module.exports = router;
