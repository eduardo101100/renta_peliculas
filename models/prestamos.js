const modeloPrestamos ={
    quieryVerPersona: "SELECT * FROM Prestamos",
    
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
    quieryGetPersonID: `SELECT * FROM Prestamos WHERE ID = ?`,
    quierydeletePersID: `UPDATE Prestamos SET Activo = 'N' WHERE ID = ?`,
    quieryPersonExis: `SELECT Nombre FROM Prestamos WHERE Nombre = "?"`,
    postAñaPerso:`INSERT INTO Prestamos (
        Nombre,
        Apellidos,
        Edad,
        ID_Libro,
        Telefono,
        Direccion,
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
        quieryGetPersonInfo: `
    SELECT Nombre, Edad, ID_Libro, Telefono, Direccion
     FROM Prestamos 
     WHERE Nombre = ?`
     
    }
    const updateLibro= (
        Nombre,
        Edad,
        ID_Libro,
        Telefono,
        Direccion,
        
    ) => {
        return `
        UPDATE Prestamos SET        
        Edad = '${Edad}',
        ID_Libro = '${ID_Libro}',
        Telefono = '${Telefono}',
        Direccion = '${Direccion}'
        WHERE Nombre = '${Nombre}'
        `
    }
    
    module.exports = {modeloPrestamos, updateLibro}