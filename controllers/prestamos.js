const { request, response } = require("express");
const pool = require("../db/connection")
const {modeloPrestamos, updateLibro} = require("../models/prestamos");

const VerPersona = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const persona = await conn.query(modeloPrestamos.quieryVerPersona, (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!persona) {
            res.status(404).json({msg:"no se encontraron registros"})
            return
        }
        res.json({persona})
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

const getPersonaID = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico 404
    const {id} = req.params

    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas basica, se pueden hacer mas complejas
        const [persona] = await conn.query(modeloPrestamos.quieryGetPersonID, [id], (error) => {throw new Error(error) })
        //siempre validar que no se obtuvieron resultados
        if (!persona) {
            res.status(404).json({msg:`no se encontro registro con el id ${id}`})
            return
        }
        res.json({persona})
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

const deletePersID = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {id} = req.query

    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        //esta es la consulta mas user basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL Libro
        const {affectedRows} = await conn.query(modeloPrestamos.quierydeletePersID, [id], (error) => {throw new Error(error) })
        
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

const postAñaPers = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const{
        Nombre,
        Apellidos,
        Edad,
        ID_Libro,
        Telefono,
        Direccion,
        Activo
       
    } = req.body

    if (
        !Apellidos||
        !Edad||
        !ID_Libro||
        !Nombre||
        !Telefono||
        !Direccion||
        !Activo
       
    ){
        res.status(400).json({msg:"Falta informacion de la Persona"})
        return
    }
  
    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()
        
        //tarea aqui user que el Libro no se duplique
       const [persona] = await conn.query(modeloPrestamos.quieryPersonExis,[Nombre],)
       
        if(persona){
            res.status(403).json({msg: `La Persona ${Nombre} ya se encuentra registrado`})
            return
        }
  
       
        //esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL Libro
        const {affectedRows} = await conn.query(modeloPrestamos.postAñaPerso, [
            Nombre,
            Apellidos,
            Edad,
            ID_Libro,
            Telefono,
            Direccion,
            Activo
        ], (error) => {throw new Error(error)})
            //'${Genero || ''}',
        //siempre validar que no se obtuvieron resultados
       
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo agregar el registro de la Persona ${Nombre}`})
            return
        }
        res.json({msg: `La Persona ${Nombre} se agrego correctamente.`})
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

const postActualPersConID = async (req = request, res = response) =>{
    //estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {

        Nombre,
        Edad,
        ID_Libro,
        Telefono,
        Direccion     
       
    } = req.body

    if (
        !Nombre||
        !Edad||
        !ID_Libro||
        !Telefono||
        !Direccion
    ){
        res.status(400).json({msg:"Falta informacion de la Persona"})
        return
    }

    let conn;
    //control de exepciones
    try {
        conn = await pool.getConnection()

        //tarea aqui que el usuario no se duplique
       const [persona] = await conn.query(modeloPrestamos.quieryGetPersonInfo,[Nombre])

       if (!persona){
        res.status(403).json({msg: `La persona ${Nombre} no se encuentra registrado`})
       }
        //esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL Libro
        //arreglar esta
        const {affectedRows} = await conn.query(updateLibro(
            Nombre,
            Edad,
            ID_Libro,
            Telefono,
            Direccion,
                  
        ),(error) => {throw new Error(error) })
        
        //siempre validar que no se obtuvieron resultados
        if (affectedRows === 0) {
            res.status(404).json({msg:`no se pudo actualizar el registro de la persona ${Nombre}`})
            return
        }
        res.json({msg: `la Persona ${Nombre} se actualizo correctamente.`})
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


module.exports = {VerPersona, getPersonaID, deletePersID, postAñaPers, postActualPersConID, }