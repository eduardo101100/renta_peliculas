const {Router} = require("express")
const {VerPersona, getPersonaID, deletePersID, postAñaPers, postActualPersConID} = require("../controllers/prestamos")
const router = Router()

//http://localhost:4000/api/v1/prestamos
//http://localhost:4000/api/v1/prestamos/id/2
//http://localhost:4000/api/v1/prestamos?id=1


//GET
router.get("/", VerPersona)
//lo siguiente despues de //id es el identificador que esta declarado en controllers (la constante)
router.get("/id/:id", getPersonaID)

//DELETE
router.delete("/", deletePersID)

//POST
router.post("/", postAñaPers)

//put
router.put("/", postActualPersConID)
/*{

  } */


module.exports = router