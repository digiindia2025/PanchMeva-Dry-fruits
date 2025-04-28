const Checkout = require("../Models/CheckoutModel");
const Razorpay = require('razorpay');
const crypto = require('crypto');
const axios = require("axios");
const CupanCode = require("../Models/VouchersModel");
const { transporter } = require("../utils/Nodemailer");
const ShortUniqueId = require("short-unique-id");
const { getYear } = require("date-fns");
const User = require("../Models/UserModel");

const razorpayInstance = new Razorpay({
    key_id: 'rzp_live_FjN3xa6p5RsEl6',
    key_secret: 'CrSeAmgW4PgPIKzsNOaqL7QB',
});

// Helper function for email template
const getOrderEmailTemplate = (checkout) => {
    const orderDetails = checkout.products.map(item => `
        <tr style="border-bottom: 1px solid #ddd; padding: 10px;">
            <td style="padding: 10px; text-align: left;">${item.productName}</td>
            <td style="padding: 10px; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; text-align: center;">₹${item.price}</td>
            <td style="padding: 10px; text-align: center;">
                <img src="${item.productImage}" alt="${item.productName}" width="80" height="80" style="border-radius: 8px;">
            </td>
        </tr>
    `).join('');

    const couponDetails = checkout.cupanCode ? `
        <tr style="background-color: #f5f5f5;">
            <td colspan="3" style="text-align: left; padding: 10px;"><strong>Coupon Code:</strong> ${checkout.cupanCode}</td>
            <td style="text-align: center; padding: 10px;"><strong>Discount:</strong> ₹${checkout.discountCupan}</td>
        </tr>
    ` : "<tr><td colspan='4' style='padding: 10px;'>No coupon used</td></tr>";

    return `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f7fc; color: #333; }
                .container { width: 80%; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); }
                .header { text-align: center; margin-bottom: 20px; }
                .header img { width: 150px; height: 150px; }
                .header h2 { color: #4CAF50; }
                .section { margin-bottom: 20px; }
                .table { width: 100%; border-collapse: collapse; }
                th, td { padding: 15px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background-color: #f2f2f2; }
                .footer { text-align: center; margin-top: 20px; font-size: 14px; }
                .footer a { color: #4CAF50; text-decoration: none; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://panchgavyamrit.com/static/media/Logo.e4770e51e9e2f1f1d58d.png" alt="Vedlakshna Logo">
                    <h2>New Order Received - Vedlakshna</h2>
                </div>
                <div class="section">
                    <h3>Order Information:</h3>
                    <p><strong>Order ID:</strong> ${checkout.orderUniqueId}</p>
                    // <p><strong>User ID:</strong> ${checkout.userId}</p>
                    <p><strong>User Name:</strong> ${checkout.shippingAddress.name}</p>
                    <p><strong>User Email:</strong> ${checkout.shippingAddress.email}</p>
                    <p><strong>User Phone:</strong> ${checkout.shippingAddress.phone}</p>

                    <p><strong>Shipping Address:</strong> ${checkout.shippingAddress.address}, ${checkout.shippingAddress.city}, ${checkout.shippingAddress.state}, ${checkout.shippingAddress.postalCode}</p>
                    <p><strong>Payment Method:</strong> ${checkout.paymentMethod}</p>
                </div>
                <div class="section">
                    <h3>Ordered Products:</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderDetails}
                        </tbody>
                    </table>
                </div>
                <div class="section">
                    ${couponDetails}
                </div>
                <div class="section">
                    <p><strong>Total Amount:</strong> ₹${checkout.totalAmount}</p>
                    <p><strong>Shipping Cost:</strong> ₹${checkout.shippingCost}</p>
                </div>
                <div class="footer">
                    <p>Thank you for your business!</p>
                    <p>If you have any questions, feel free to <a href="mailto:support@vedlakshna.com">contact us</a>.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};
exports.checkout = async (req, res) => {
    console.log(req.body);
    const { userId, products, shippingAddress, paymentMethod, cupanCode } = req.body;

    const pincode = shippingAddress.postalCode;
    const subtotal = products.reduce((total, item) => total + (item.price * item.quantity), 0);
    let shippingCost = 200;
    let discountAmount = 0;
    let discountCupan = 0;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    address: shippingAddress.address,
                    phone: shippingAddress.phone,
                    city: shippingAddress.city,
                    state: shippingAddress.state,
                    postalCode: shippingAddress.postalCode,
                    country: shippingAddress.country || "",
                },
            },
            { new: true }
        );
        console.log("response:====:", updatedUser, "SSSSSSSSS:-", userId, shippingAddress);

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Failed to update user info" });
    }



    // Fetch shipping charge based on pincode
    if (pincode) {
        try {
            const response = await axios.get("https://api.panchgavyamrit.com/api/all-pincode");
            const pinCodeData = response.data.find(item => item.pincode === parseInt(pincode));
            if (pinCodeData) {
                shippingCost = pinCodeData.shippingCharge;
            }
        } catch (error) {
            console.error("Error fetching shipping charge:", error);
        }
    }




    // Validate coupon and calculate discount

    if (cupanCode) {
        try {
            const coupon = await validateCoupon(cupanCode);
            if (coupon && coupon.vouchersStatus) {
                if (coupon.discount > 0) {
                    if (coupon.discount < 100) {
                        discountCupan = (subtotal * coupon.discount) / 100;
                    } else {
                        discountCupan = coupon.discount;
                    }
                    discountCupan = Math.min(discountCupan, subtotal);
                } else {
                    return res.status(400).json({ error: "Coupon code has no valid discount" });
                }
            } else {
                return res.status(400).json({ error: "Invalid or expired coupon code" });
            }
        } catch (error) {
            console.error("Error validating coupon:", error);
            return res.status(500).json({ error: "Error validating coupon" });
        }
    }

    const totalAmount = subtotal + shippingCost - discountCupan;
    const orderLength = await Checkout.countDocuments();
    const currentYear = getYear(new Date());
    const lastTwoDigits = currentYear.toString().slice(-2);
    const nextYearDigits = (parseInt(lastTwoDigits) + 1).toString();
    const orderNumber = orderLength + 1;

    const uniqueUserId = `SS/WEB/${lastTwoDigits}-${nextYearDigits}/0${orderNumber}`;
    try {
        const checkout = new Checkout({
            userId,
            orderUniqueId: uniqueUserId,
            products: products.map(item => ({
                productName: item.productName,
                productImage: item.productImage,
                price: item.price,
                weight: item.weight,
                quantity: item.quantity,
                productId: item.productId,
            })),
            shippingAddress,
            paymentMethod,
            totalAmount,
            shippingCost,
            cupanCode,
            discountCupan
        });

        // If payment method is online, create a Razorpay order
        if (paymentMethod === 'Online') {
            const razorpayOrder = await razorpayInstance.orders.create({
                amount: totalAmount * 100, // Razorpay expects amount in paise
                currency: 'INR',
                receipt: checkout._id.toString(),
                payment_capture: 1,
            });

            console.log("Razorpay Order:", razorpayOrder);

            checkout.paymentInfo = {
                transactionId: razorpayOrder.id,
                orderId: razorpayOrder.receipt,
            };

            await checkout.save();

            // Send welcome email
            console.log("getOrderEmailTemplate:==", checkout)
            await transporter.sendMail({
                from: "Panchgavya.amrit@gmail.com",
                to: "Panchgavya.amrit@gmail.com",
                subject: "New Order Received from Vedlakshna",
                html: getOrderEmailTemplate(checkout)
            });

            return res.status(201).json({
                message: 'Checkout successful. Payment initiated via Razorpay.',
                checkout,
                razorpayOrder,
            });
        }

        await checkout.save();
        // Send welcome email
        await transporter.sendMail({
            from: "Panchgavya.amrit@gmail.com",
            to: "Panchgavya.amrit@gmail.com",
            subject: "New Order Received from Vedlakshna",
            html: getOrderEmailTemplate(checkout)
        });

        res.status(201).json({ message: 'Checkout successful', checkout });

    } catch (error) {
        console.error('Error processing checkout:', error);
        res.status(500).json({ error: 'Server error during checkout process' });
    }
};



exports.verifyPayment = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, order_id } = req.body;
    console.log(req.body)
    const checkout = await Checkout.findById(order_id);
    console.log(checkout)
    if (!checkout) {
        return res.status(400).json({ error: 'Order not found' });
    }
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', razorpayInstance.key_secret)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        checkout.paymentStatus = 'Successfull';
        checkout.paymentInfo.paymentId = razorpay_payment_id;
        checkout.paymentInfo.razorpaySignature = razorpay_signature;
        await checkout.save();

        return res.status(200).json({ message: 'Payment verified successfully', checkout });
    } else {
        return res.status(400).json({ error: 'Payment verification failed' });
    }
};

exports.getData = async (req, res) => {
    try {
        const data = await Checkout.find()
        if (!data && data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            })
        }
        res.status(200).json({
            success: true,
            data: data.reverse()
        })
    } catch (error) {
        console.log(error)
    }
}


exports.getDataSingle = async (req, res) => {
    try {
        const data = await Checkout.findById(req.params.id)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            })
        }
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus, paymentStatus } = req.body;
        const existingOrder = await Checkout.findById(req.params.id);
        if (!existingOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        // Prepare the update object
        const updatedData = {};
        if (orderStatus) updatedData.orderStatus = orderStatus;
        if (paymentStatus) updatedData.paymentStatus = paymentStatus;

        // Update the order
        const updatedOrder = await Checkout.findByIdAndUpdate(
            req.params.id,
            { $set: updatedData },
            { new: true } // Return the updated document
        );

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: updatedOrder,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the order",
        });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const data = await Checkout.findById(req.params.id)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            })
        }
        await data.deleteOne()
        res.status(200).json({
            success: true,
            message: "Order Delete Successfully"
        })
    } catch (error) {
        console.log(error)
    }
}


exports.getorderByUserID = async (req, res) => {
    try {
        const data = await Checkout.find({ userId: req.params.id })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Order Found Successfully",
            data: data.reverse()
        })
    } catch (error) {
        console.log(error)
    }
}


async function validateCoupon(code) {
    const coupon = await CupanCode.findOne({ code: code });
    if (!coupon) {
        return null; // Invalid or expired coupon
    }
    return coupon;
}
