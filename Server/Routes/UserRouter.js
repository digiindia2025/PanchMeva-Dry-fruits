const { createRecord, getRecords, deleteRecord, login, getSingleRecords, logout, forgotPassword, resetPassword } = require("../Controller/UserController")
const { protectAdmin } = require("../Middlewares/Authorization")

const UserRouter = require("express").Router()

UserRouter.post("/signup", createRecord)
UserRouter.get("/all-users",  getRecords)
UserRouter.get("/get-user/:id", getSingleRecords)
UserRouter.delete("/delete-user/:id", deleteRecord)


UserRouter.post("/log-in", login)
UserRouter.post("/log-out", logout)

UserRouter.post('/forgot-password', forgotPassword);
UserRouter.post('/reset-password', resetPassword);


module.exports = UserRouter