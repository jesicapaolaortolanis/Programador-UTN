var pool = require('./bd');

//sirve para alistar las novedades
async function getNovedades() {
        var query = 'select * from Novedades';
        var rows = await pool.query(query);
        return rows;

    };

async function deleteNovedadesById(id) {
    var query = 'delete from novedades where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;

    };


module.exports = {getNovedades, deleteNovedadesById}