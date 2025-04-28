const express = require('express');
const { checkout, verifyPayment, getData, getDataSingle, deleteOrder, updateOrderStatus, getorderByUserID } = require('../Controller/CheckoutController');
const CheckoutRouter = express.Router();

// POST route for checkout
CheckoutRouter.post('/checkout', checkout);
CheckoutRouter.post('/payment/verify', verifyPayment);
CheckoutRouter.get('/order-data', getData);
CheckoutRouter.get('/single-order-data/:id', getDataSingle);
CheckoutRouter.get('/all-order-by-userid/:id', getorderByUserID);
CheckoutRouter.delete('/delete-order-data/:id', deleteOrder);
CheckoutRouter.put('/update-order/:id', updateOrderStatus);

module.exports = CheckoutRouter;
