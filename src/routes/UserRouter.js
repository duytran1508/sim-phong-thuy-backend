const express = require("express"); 
const router = express.Router(); 
const userController = require("../controllers/UserController"); 
// [POST] /api/user/register 
router.post("/register", userController.registerUser); 
// [POST] /api/user/login 
router.post("/login", userController.loginUser); 
// [PUT] /api/user/update/:id 
router.put("/update/:id", userController.updateUser); 
// [GET] /api/user/:id 
router.get("/:id", userController.getUserById); 
// [DELETE] /api/user/delete/:id 
router.delete("/delete/:id", userController.deleteUser); 
// [GET] /api/user 
router.get("/", userController.getAllUsers); 

module.exports = router;