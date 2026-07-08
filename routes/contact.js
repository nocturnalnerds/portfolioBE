import express from "express";
import nodemailer from "nodemailer";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        if (process.env.NODE_ENV === "development") {
            //
            // MAILTRAP SMTP SANDBOX
            //
            const transporter = nodemailer.createTransport({
                host: process.env.MAILTRAP_SMTP_HOST,
                port: Number(process.env.MAILTRAP_SMTP_PORT),
                auth: {
                    user: process.env.MAILTRAP_SMTP_USER,
                    pass: process.env.MAILTRAP_SMTP_PASS,
                },
            });

            await transporter.sendMail({
                from: `"${name}" <${email}>`,
                to: process.env.CONTACT_EMAIL,
                subject: "Portfolio Contact",
                text: `
Name: ${name}
Email: ${email}

${message}
`,
                html: `
<h2>Portfolio Contact</h2>

<p><b>Name</b>: ${name}</p>

<p><b>Email</b>: ${email}</p>

<p>${message}</p>
`,
            });
        } else {
            //
            // MAILTRAP EMAIL API
            //
            await axios.post(
                "https://send.api.mailtrap.io/api/send",
                {
                    from: {
                        email: "hello@demomailtrap.com",
                        name: "Portfolio",
                    },
                    to: [
                        {
                            email: process.env.CONTACT_EMAIL,
                        },
                    ],
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
                    category: "Portfolio Contact",
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.MAILTRAP_API_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

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