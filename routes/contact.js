import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
            connectionTimeout: 10000,
            socketTimeout: 10000,
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            replyTo: `"${name}" <${email}>`,
            to: "sandjayawilliams16072005@gmail.com",
            subject: "Portfolio Contact",
            text: `Name: ${name}
Email: ${email}

${message}`,
            html: `
<h2>Portfolio Contact</h2>

<p><b>Name</b>: ${name}</p>

<p><b>Email</b>: ${email}</p>

<p>${message}</p>
`,
        });

        return res.json({
            success: true,
        });
    } catch (err) {
        console.error(err.response?.data || err);

        return res.status(500).json({
            success: false,
            message: "Unable to send email.",
        });
    }
});

export default router;