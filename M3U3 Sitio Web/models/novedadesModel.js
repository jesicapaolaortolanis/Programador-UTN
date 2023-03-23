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

async function insertNovedad(obj) {
    try{
        var query = 'insert into novedades set ?';
        var rows = await pool.query(query, [obj]);
        return rows;

    }catch (error){
        console.log(error);
        throw error;
    } // cierra catch
} //cierra Insert


// Traigo los datos para modificar UNA sola novedad

async function getNovedadById(id) {
    var query = "select * from novedades where id=?";
    var rows = await pool.query(query, [id]);
    return rows[0];
}


async function modificarNovedadById(obj, id) {
    try{
        var query = "update novedades set ? where id=? ";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
} //Cierra modificar update



module.exports = {getNovedades, deleteNovedadesById, insertNovedad, getNovedadById, modificarNovedadById}