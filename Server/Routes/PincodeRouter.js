const { createPincode, getAllPinCodes, getPincodeById, updatePincode, deletePincode } = require("../Controller/PincodeController")

const PincodeRouter = require("express").Router()

PincodeRouter.post("/add-pincode" , createPincode)
PincodeRouter.get("/all-pincode" , getAllPinCodes)
PincodeRouter.get("/single-pincode/:id" , getPincodeById)
PincodeRouter.put("/update-pincode/:id" , updatePincode)
PincodeRouter.delete("/delete-pincode/:id" , deletePincode)

module.exports = PincodeRouter