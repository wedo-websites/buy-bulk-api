require("./config/env");
require("./src/v1/utils/constants");
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/database");
const syncModels = require("./src/v1/models/dbSync");
const errorHandler = require("./src/v1/middlewares/errorHandler");
const routes = require("./src/v1/routes");

const app = express();
app.use(cors());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use("/api/v1", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        await syncModels();
        app.listen(PORT, () => {
            console.log(`🌍 Server is running on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Server startup error:", error);
        process.exit(1);
    }
};

startServer();