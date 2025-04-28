const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../Controller/ProductController")
const upload = require("../Middlewares/Multer")

const ProductRouter = require("express").Router()

ProductRouter.post("/add-product", upload.array("productImage"), createProduct)
ProductRouter.get("/get-product", getAllProducts)
ProductRouter.get("/single-product/:id", getProductById)
ProductRouter.put("/update-product/:id", upload.array("productImage"), updateProduct)
ProductRouter.delete("/delete-product/:id", deleteProduct)


module.exports = ProductRouter