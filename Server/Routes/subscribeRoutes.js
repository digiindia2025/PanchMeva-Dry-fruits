const express = require("express");
const { createSubscription } = require("../Controller/SubcribeController");
const SubcribeRouter = express.Router();

// POST route for creating a subscription
SubcribeRouter.post("/subscribe", createSubscription);

module.exports = SubcribeRouter;
