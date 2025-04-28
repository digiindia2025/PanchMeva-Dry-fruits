const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const { connectDB } = require("./DB/ConnectDatabase");
const CategoryRouter = require("./Routes/categoryRoutes");
const SubcategoryRouter = require("./Routes/SubcategoryRouter");
const ProductRouter = require("./Routes/ProductRoutes");
const UserRouter = require("./Routes/UserRouter");
const CheckoutRouter = require("./Routes/CheckoutRouter");
const BannerRouter = require("./Routes/BannerRouter");
const PincodeRouter = require("./Routes/PincodeRouter");
const ContactRouter = require("./Routes/contactRoutes");
const VouchersRouter = require("./Routes/VouchersRouter");
const ArticalRouter = require("./Routes/ArticalRouter");
const SubcribeRouter = require("./Routes/subscribeRoutes");
const shiprocket = require("./Routes/ShipRocketRoutes");

const app = express();

// Allowed origins (your frontend domains)
const allowedOrigins = [
    'https://panchgavyamrit.com',
    'https://www.panchgavyamrit.com',
    'https://admin.panchgavyamrit.com',
    'https://api.panchgavyamrit.com',

    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',  
];

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies to be sent
};

// Apply CORS options to the app
app.use(cors(corsOptions));

app.use(cookieParser());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet()); // Set secure HTTP headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Sanitize user input to prevent XSS
app.use(hpp()); // Prevent HTTP Parameter Pollution

app.set(express.static("./Public"));

app.get("/", (req, res) => {
    res.send("Server is running");
});

// Routes
app.use("/api", CategoryRouter);
app.use("/api", SubcategoryRouter);
app.use("/api", ProductRouter);
app.use("/api", UserRouter);
app.use("/api", CheckoutRouter);
app.use("/api", BannerRouter);
app.use("/api", PincodeRouter);
app.use("/api", ContactRouter);
app.use("/api", VouchersRouter);
app.use("/api", ArticalRouter);
app.use("/api", SubcribeRouter);
app.use("/api" ,shiprocket)

// Start the server
const PORT = process.env.PORT || 8000;
// //////////////aman///////////////
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT} port`);
});

connectDB();
