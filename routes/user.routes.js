const express = require("express")
const router = express.Router();
const userController=require("../controllers/user.controller")
const jwVerify=require("../middlewares/jwtVerify")

//GET-Leer usuario
router.get("/users", jwVerify,userController.getAllUser)

//POST- Crear usuario
router.post("/users", userController.postUser);
//GET-Leer usuario
router.get("/users/:id", userController.getUser)

// POST - Login
router.post("/login", userController.login)



//DELETE - Borrar usuario
router.delete("/users/:id", userController.deleteUser)
//PUT-Actualizar usuario
router.put("/users/:id", userController.updateUser)
router.patch("/users/:id/password", userController.updatePassword)


module.exports = router;