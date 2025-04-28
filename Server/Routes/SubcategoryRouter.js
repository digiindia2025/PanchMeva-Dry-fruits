const { createSubcategory, getAllSubcategories, getSubcategoryById, updateSubcategory, deleteSubcategory } = require("../Controller/SubcategoryController")
const upload = require("../Middlewares/Multer")

const SubcategoryRouter = require("express").Router()

SubcategoryRouter.post("/add-subcategory", upload.single("subcategoryImage"), createSubcategory)
SubcategoryRouter.get("/get-subcategory", getAllSubcategories)
SubcategoryRouter.get("/single-subcategory/:id", getSubcategoryById)
SubcategoryRouter.put("/update-subcategory/:id", upload.single("subcategoryImage"), updateSubcategory)
SubcategoryRouter.delete("/delete-subcategory/:id", deleteSubcategory)

module.exports = SubcategoryRouter