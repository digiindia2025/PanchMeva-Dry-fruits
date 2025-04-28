const { createCupanCode, getSingleVouchers, getVouchers, updateVouchers, deleteVouchers } = require("../Controller/VouchersController")

const VouchersRouter = require("express").Router()

VouchersRouter.post("/create-vouchers", createCupanCode)
VouchersRouter.get("/all-vouchers", getVouchers)
VouchersRouter.get("/single-vouchers/:id", getSingleVouchers)
VouchersRouter.put("/update-vouchers/:id", updateVouchers)
VouchersRouter.delete("/delete-vouchers/:id", deleteVouchers)


module.exports = VouchersRouter
