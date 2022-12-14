const {Router} = require("express")
const {VerPelicula, getPeliID, deletePeliPorID, postAñaLibro, postActualLibConID} = require("../controllers/renta")
const router = Router()

//http://localhost:4000/api/v1/Renta
//http://localhost:4000/api/v1/Renta/id/2
//http://localhost:4000/api/v1/Renta?id=1


//GET
router.get("/", VerPelicula)
//lo siguiente despues de //id es el identificador que esta declarado en controllers (la constante)
router.get("/id/:id", getPeliID)

//DELETE
router.delete("/", deletePeliPorID)

//POST
router.post("/", postAñaLibro)


//put
router.put("/", postActualLibConID)
/*{
	"Usuario":"laloa@gmail.com",
	"Nombre":"Jose",
  "Apellidos":"javier",
  "Edad":12,
  "Genero":"M",
	"Contraseña":"1234"
  } */


module.exports = router