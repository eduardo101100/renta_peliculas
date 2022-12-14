const { request, response } = require("express");
const pool = require("../db/connection")
const {modeloRenta, updateLibro} = require("../models/Renta");

const VerPelicula = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const peli = await conn.query(modeloRenta.quieryVerPelicula, (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!peli) {
            res.status(404).json({msg:"no se encontraron registros"})
            return
        }
        res.json({peli})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const getPeliID = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {id} = req.params

    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const peli = await conn.query(modeloRenta.quieryGetPeliID, [id], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (peli) {
            res.status(404).json({msg:`no se encontro registro con el id ${id}`})
            return
        }
        res.json({peli})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const deletePeliPorID = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {id} = req.query

    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas user basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL Libro
        const {affectedRows} = await conn.query(modeloRenta.quierydeletePeliPorID, [id], (error) => {throw new Error(error) })
        
        //siempre validar que no se obtuvieron resultados
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo eliminar el registro con el id ${id}`})
            return
        }
        res.json({msg: `El Libro con id ${id} se elimino correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const postAñaLibro = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const{
        Nombre,
        Genero,
        Año,
        Comentario,
        Precio,
        Cantidad_Disponible,
        Activo
       
    } = req.body

    if (
        !Nombre||
        !Genero||
        !Año||
        !Comentario||
        !Precio||
        !Cantidad_Disponible||
        !Activo
       
    ){
        res.status(400).json({msg:"Falta informacion de la pelicula"})
        return
    }
  
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        
        //tarea aqui user que el Libro no se duplique
       const [peli] = await conn.query(modeloRenta.quieryPeliexis,[Nombre],)
       
        if(peli){
            res.status(403).json({msg: `La pelicula ${Nombre} ya se encuentra registrado`})
            return
        }
  
       
        //esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL Libro
        const {affectedRows} = await conn.query(modeloRenta.postAñaLibro, [
        Nombre,
        Genero,
        Año,
        Comentario,
        Precio,
        Cantidad_Disponible,
        Activo
        ], (error) => {throw new Error(error)})
            //'${Genero || ''}',
        //siempre validar que no se obtuvieron resultados
       
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo agregar el registro de la pelicula ${Nombre}`})
            return
        }
        res.json({msg: `La pelicula ${Nombre} se agrego correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
        conn.end()
        }
    }
}

const postActualLibConID = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {

        Nombre,
        Genero,
        Comentario,
        Precio,
        Cantidad_Disponible      
       
    } = req.body

    if (
        !Nombre||
        !Genero||
        !Comentario||
        !Precio||
        !Cantidad_Disponible 
    ){
        res.status(400).json({msg:"Falta informacion de la pelicula"})
        return
    }

    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()

        //tarea aqui que el usuario no se duplique
       const [peli] = await conn.query(modeloRenta.quieryGetLibroInfo,[Nombre])

       if (!peli){
        res.status(403).json({msg: `El Libro ${Nombre} no se encuentra registrado`})
       }
        //esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL Libro
        //arreglar esta
        const {affectedRows} = await conn.query(updateLibro(
        Nombre,
        Genero,
        Comentario,
        Precio,
        Cantidad_Disponible,
        
        
            // Nombre,
        // Apellidos,
        // Edad,
        // Genero,
        // Fecha_nacimiento,
        // Libro              
        ),(error) => {throw new Error(error) })
            //'${Genero || ''}',
        //siempre validar que no se obtuvieron resultados
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo actualizar el registro del Libro ${Nombre}`})
            return
        }
        res.json({msg: `la pelicula ${Nombre} se actualizo correctamente.`})
        //lo del cath y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


module.exports = {VerPelicula, getPeliID, deletePeliPorID, postAñaLibro, postActualLibConID, }