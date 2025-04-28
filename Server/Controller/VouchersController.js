const CupanCode = require("../Models/VouchersModel")

const createCupanCode = async (req, res) => {
    try {
        const { code, discount, vouchersStatus } = req.body
        if (!code || !discount) {
            return res.status(400).json({
                success: false,
                message: "Cupan code and discount is required"
            })
        }
        const data = new CupanCode({ code, discount, vouchersStatus: vouchersStatus || false })
        await data.save()
        return res.status(200).json({
            success: true,
            message: "Cupan Code Created Successfully",
            data: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: true,
            message: "Internal Server Error"
        })
    }
}


const getVouchers = async (req, res) => {
    try {
        const data = await CupanCode.find()
        return res.status(200).json({
            success: true,
            message: "Cupan Code Found Successfully",
            data: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const getSingleVouchers = async (req, res) => {
    try {
        const data = await CupanCode.findById(req.params.id)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Cupan Code Found Successfully",
            data: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const updateVouchers = async (req, res) => {
    console.log(req.body)
    try {
        const data = await CupanCode.findById(req.params.id)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        data.code = req.body.code || data.code
        data.discount = req.body.discount || data.discount
        data.vouchersStatus = req.body.vouchersStatus || false
        await data.save()
        return res.status(200).json({
            success: true,
            message: "Cupan Code Updated Successfully",
            data: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const deleteVouchers = async (req, res) => {
    try {
        const data = await CupanCode.findById(req.params.id)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        await data.deleteOne()
        return res.status(200).json({
            success: true,
            message: "Cupan Code delete Successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    createCupanCode, getSingleVouchers, getVouchers, updateVouchers, deleteVouchers
}

