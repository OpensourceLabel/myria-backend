import { createTransport } from "nodemailer";
import twilio from "twilio";
import "dotenv/config.js";

export default {
    // Email
    email: async (email, subject, message) => {
        // create transport
        let transporter = createTransport({
            host: process.env.DOMAINE,
            port: process.env.PORTDOMAINE,
            secureConnection: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            },
        });

        // create model send email
        let info = await transporter.sendMail({
            from: `"UHtec SARL 👻" ${process.env.USER}`, // sender address
            to: email,
            subject: `${subject}`, // Subject line
            text: `${message}`, // plain text body
            // html: `${message}`
        });

        if (info?.messageId) {
            console.log(`Email envoyé avec succès...`);
        }
    },

    // SMS with twilio
    sms: async (phone, message) => {
        const client = twilio(process.env.TWILIO_ID, process.env.TWILIO_Auth);
        client.messages.create({
            from: compteTwillo.From,
            to: phone,
            body: message
        });
    }
};