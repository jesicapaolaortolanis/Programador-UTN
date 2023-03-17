var express = require('express');
var router = express.Router();

var novedadesModel = require('../../models/novedadesModel');

router.get('/', async function(req, res, next) {

    var novedades = await novedadesModel.getNovedades();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades,
    });
});


/*Para eliminar una novedad*/ 
router.get('/eliminar/:id', async(req, res, next) => {
    
    const id = req.params.id;
    await novedadesModel.deleteNovedadesById(id);
    res.redirect('/admin/novedades'); 

}); //cierra el get de eliminar


//diseño para la página agregar, lo que se abre para el botón +Nuevo, agregar

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout',
    }); //Cierra el render
}); //Cierra el Get


// Insertar la novedad en la Base de Datos

router.post('/agregar', async (req, res, next) => {
    try {
        if(req.body.Titulo != ""  && req.body.Subtitulo != ""  && req.body.Cuerpo != "") {
            await novedadesModel.insertNovedad(req.body);
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargó la novedad'
        });
    };
});

// Diseño de Modificar + traer la novedad que yo seleccioné

router.get('/modificar/:id', async(req, res, next) => {
    var id = req.params.id; 

    var novedad = await novedadesModel.getNovedadById(id);
    res.render('admin/modificar', {
        layout:'admin/layout',
        novedad
    });
}); //Cierro get modificar


//Actualizar la novedad

router.post('/modificar', async(req, res, next) => {
    try {
        console.log(req.body.id); //para ver si trae id
        var obj = {
            Titulo: req.body.Titulo,
            Subtitulo: req.body.Subtitulo,
            Cuerpo: req.body.Cuerpo
        }

        console.log(obj) //para ver si trae los datos
        await novedadesModel.modificarNovedadById(obj, req.body.id);
        res.redirect('/admin/novedades');
    }catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modificó la novedad.'
        })
    } //Cierro catch
}) //Cierro el post


module.exports = router;
