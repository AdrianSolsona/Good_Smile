const userController = require("../controllers/userController");
const isAdmin = require("../middlewares/isAdmin");
const verifyToken = require('../middlewares/verifyToken');
const router = require("express").Router();

// All available routes for the model User
router.post("/users",userController.createUser)
router.get("/users/:id", verifyToken,userController.getUserById)
router.put("/users/:id", verifyToken,userController.getUserById)
router.delete("/users/:id", verifyToken, isAdmin, userController.deleteUserById)

module.exports = router