const pacientController = require("../controllers/pacientController");
const router = require("express").Router();


router.post("/pacients", pacientController.createPacient)
router.get("/pacients", pacientController.getPacient)
router.get("/pacients/:id", pacientController.getPacientById)
router.put("/pacients/:id", pacientController.putPacientById)
router.delete("/pacients/:id", pacientController.deletePacientById)


module.exports = router