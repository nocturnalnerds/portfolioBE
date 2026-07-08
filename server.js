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

app.use("/api/contact", contactRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server ENV ${process.env.NODE_ENV}`);
    console.log(`Server running on ${process.env.PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV}`);
});