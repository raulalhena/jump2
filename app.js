import express from "express";
import router from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(router);

// Server listening on port 5000
app.listen(process.env.SERVER_PORT || 5000, () => {
    console.log("Listening on port 5000...");
});