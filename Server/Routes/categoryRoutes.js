const express = require("express");
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require("../Controller/CategoryCotroller");
const upload = require("../Middlewares/Multer");
const CategoryRouter = express.Router();

// Routes
CategoryRouter.post("/add-category", upload.single("categoryImage"), createCategory);
CategoryRouter.get("/all-category", getAllCategories);
CategoryRouter.get("/signle-category/:id", getCategoryById);
CategoryRouter.put("/update-category/:id", upload.single("categoryImage"), updateCategory);
CategoryRouter.delete("/delete-category/:id", deleteCategory);

module.exports = CategoryRouter;
