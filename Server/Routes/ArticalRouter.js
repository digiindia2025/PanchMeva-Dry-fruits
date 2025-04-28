const express = require("express");
const upload = require("../Middlewares/Multer");
const { createActical, getAllActicals, getActicalById, updateActical, deleteActical } = require("../Controller/ArticalController");
const ArticalRouter = express.Router();

ArticalRouter.post("/create-artical", upload.single("image"), createActical); // For file upload
ArticalRouter.get("/all-articals", getAllActicals);
ArticalRouter.get("/single-artical/:id", getActicalById);
ArticalRouter.put("/update-artical/:id", upload.single("image"), updateActical);
ArticalRouter.delete("/delete-artical/:id", deleteActical);

module.exports = ArticalRouter;
