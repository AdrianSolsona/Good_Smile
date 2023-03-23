const appointmentController = require("../controllers/appointmentController");
const isDentist = require("../middlewares/isDentist");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

// All available routes for the model Appointment
router.post("/appointments", verifyToken,appointmentController.createAppointment)
router.get("/appointments/doctor", verifyToken,isDentist,appointmentController.getAppointment)
router.get("/appointments", verifyToken,appointmentController.getAppointmentById)
router.put("/appointments/:id", verifyToken,appointmentController.putAppointmentById)
router.delete("/appointments", verifyToken,appointmentController.deleteAppointmentById)


module.exports = router