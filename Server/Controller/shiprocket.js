const axios = require('axios');
const Checkout = require('../Models/CheckoutModel');

const ShipRocketLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email,
            password
        });
        return res.status(200).json({
            success: true,
            data: response.data,
            msg: "Login successful"
        });
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json({
                success: false,
                msg: error.response.data.message || "Error during login"
            });
        }
        return res.status(500).json({
            success: false,
            msg: error.message || "Internal Server Error"
        });
    }
};

// Prepare Order for Shipping
const MakeOrderReadyToShip = async (req, res) => {
    try {
        console.log(req.body)
        const { length, breadth, height, weight, order_id } = req.body;

        // Fetch order details
        const order = await Checkout.findById(order_id);
        if (!order) {
            return res.status(404).json({
                success: false,
                msg: "Order not found"
            });
        }

        console.log("My Order", order)
        // Check if the order has already been sent to ShipRocket
        if (order.sentToShipRocket) {
            return res.status(400).json({
                success: false,
                msg: "Order has already been sent to ShipRocket"
            });
        }

        // Map order items for shipment
        // Map order items for shipment
        const orderItemsArray = order.products.map((item, index) => ({
            name: item.productName,
            sku: `MKV${index + 1}`, // Use a fallback SKU since productid is not available
            units: parseInt(item.quantity), // Assuming quantity is productquantity
            selling_price: parseFloat(item.price),
            discount: 0,
            tax: 0,
            hsn: 441122,
            image: item.productImage // Use productimage for the image field
        }));


        // Fetch token from ShipRocket
        const loginResponse = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
            email: 'digiindiasolutions2024@gmail.com',
            password: 'Mannu@2207' 
        });

        const token = loginResponse.data.token;


        // Prepare the data for ShipRocket
        const data = {
            order_id,
            order_date: new Date().toISOString(),
            billing_customer_name: order.shippingAddress.name,
            billing_last_name: "",
            billing_address: order.shippingAddress.address,
            billing_address_2: "",
            billing_city: order.shippingAddress.city,
            billing_pincode: order.shippingAddress.postalCode,
            billing_state: order.shippingAddress.state,
            billing_country: "India",
            billing_email: order.shippingAddress.email,
            billing_phone: order.shippingAddress.phone,
            shipping_is_billing: true,
            order_items: orderItemsArray,
            payment_method: order.paymentMethod,
            shipping_charges: order.shippingCost,
            giftwrap_charges: 0,
            transaction_charges: 0,
            total_discount: order.discountCupan,
            sub_total: order.products.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            length,
            breadth,
            height,
            weight
        };

        // Sending request to ShipRocket API
        const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Update the order to indicate it has been sent to ShipRocket
        order.sentToShipRocket = true;
        await order.save();

        return res.status(200).json({
            success: true,
            msg: "Shipping is Done",
            data: response.data
        });

    } catch (error) {
        console.error(error);
        if (error.response) {
            return res.status(error.response.status).json({
                success: false,
                msg: error.response.data.message || "Unknown Error"
            });
        } else if (error.request) {
            return res.status(500).json({
                success: false,
                msg: "No response from ShipRocket server"
            });
        } else {
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    }
};


module.exports = {
    MakeOrderReadyToShip, ShipRocketLogin
}