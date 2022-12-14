const express = require('express')
const prestamosRouter = require('./routes/prestamos')
const rentaRouter = require('./routes/renta')
const cors = require("cors")

class Server {
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT
        this.paths = {
            prestamos:"/api/v1/prestamos",
            renta:"/api/v1/renta"
        }
        this.middlewares()
        this.routes()
    }

    routes() {
       /* this.app.get('/' , (req, res) => {
            res.send ('Hello word');
        
        }) //end point
    */

    this.app.use(this.paths.prestamos, prestamosRouter)
    this.app.use(this.paths.renta, rentaRouter)
    }

middlewares(){
this.app.use(cors()) //permite solicitudes de origen cruzado
this.app.use(express.json())//habilita la lectura de contenido en formato JSON
}

    listen(){
        this.app.listen(this.PORT, () => {
            console.log('servidor corriendo en el puerto ', this.PORT);
        
        })
    }
}

module.exports = Server