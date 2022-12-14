const modeloRenta ={
    quieryVerPelicula: "SELECT * FROM Renta",
    
    //se sustituye cada elemento del arreglo por cada signo de interrogacion, y se acomodan en el orden respectivo
    /*si se usa 2 veces se pasa las 2 veces 
    Usuario,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contraseña,
        Fecha_nacimiento,
        Activo*/
    quieryGetPeliID: `SELECT * FROM Renta WHERE ID = ?`,
    quierydeletePeliPorID: `UPDATE Renta SET Activo = 'N' WHERE ID = ?`,
    quieryPeliexis: `SELECT Nombre FROM Renta WHERE Nombre = "?"`,
    postAñaLibro:`INSERT INTO Renta (
        Nombre,
        Genero,
        Año,
        Comentario,
        Precio,
        Cantidad_Disponible,
        Activo
        ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?)
        `,
        quieryGetLibroInfo: `
    SELECT Nombre, Genero , Comentario, Precio, Cantidad_Disponible
     FROM Renta 
     WHERE Nombre = ?`
     
    }
    const updateLibro= (
        Nombre,
        Genero,
        Comentario,
        Precio,
        Cantidad_Disponible
        
    ) => {
        return `
        UPDATE Renta SET        
        Genero = '${Genero}',
        Comentario = '${Comentario}',
        Precio = '${Precio}',
        Cantidad_Disponible = '${Cantidad_Disponible}'
        WHERE Nombre = '${Nombre}'
        `
    }
    
    module.exports = {modeloRenta, updateLibro}