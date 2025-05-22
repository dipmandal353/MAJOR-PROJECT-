import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"

dotenv.config(); // Load .env variables

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ,
  port: process.env.SMTP_PORT ,
  secure: true, // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_MAIL, // Your email address
    pass: process.env.SMTP_PASSWORD, // Your app password
  },
});




const sendFeedback = async (req, res) => {


    const { name, email, feedback } = req.body;


    if (!name || !feedback || !email) {
        return res.status(400).send("Name, Email and feedback cannot be empty");
    }


    const mailOptions = {
        from: email, // The user's email address
        to: process.env.SMTP_MAIL, // Admin's email address (your email)
        subject: "New Feedback Received",
        html: `<p>A new feedback has been received from ${name} (${email}).</p>
                <p>The given feedback is:</p>
                <b>${feedback}</b>`,
};



    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Feedback sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Failed to send feedback");
    }
};


export default sendFeedback;
