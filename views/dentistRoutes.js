const dentistController = require("../controllers/dentistController");
const isAdmin = require("../middlewares/isAdmin");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

// All available routes for the model Dentist
router.post("/dentists", verifyToken, dentistController.createDentist)
router.get("/dentists", verifyToken, dentistController.getDentist)
router.get("/dentists/:id", verifyToken,dentistController.getDentistById)
router.put("/dentists/:id", verifyToken,dentistController.putDentistById)
router.delete("/dentists/:id",verifyToken, isAdmin,dentistController.deleteDentistsById)

module.exports = router