import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import contactRouter from "./routes/contact.js";

dotenv.config({
    path:
        process.env.NODE_ENV === "production"
            ? ".env.production"
            : ".env.development",
});

const app = express();

app.use(cors());
app.use(express.json());

contactRouter.get('/hello', (req, res) => {
    res.json({ message: "Hello from your Node.js API!" });
});

app.use("/.netlify/functions/", contactRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server ENV ${process.env.NODE_ENV}`);
    console.log(`Server running on ${process.env.PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV}`);
});

module.exports.handler = serverless(app);