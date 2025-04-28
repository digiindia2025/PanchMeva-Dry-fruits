const { createBanner, getAllBanners, getBannerById, updateBanner, deleteBanner } = require("../Controller/BannerController")
const upload = require("../Middlewares/Multer")

const BannerRouter = require("express").Router()

BannerRouter.post("/create-banner", upload.single("bannerImage"), createBanner)
BannerRouter.get("/all-banner", getAllBanners)
BannerRouter.get("/single-banner/:id", getBannerById)
BannerRouter.put("/update-banner/:id", upload.single("bannerImage"), updateBanner)
BannerRouter.delete("/delete-banner/:id", deleteBanner)

module.exports = BannerRouter