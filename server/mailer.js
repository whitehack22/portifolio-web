import nodemailer from 'nodemailer';
import nodemailerExpressHandlebars  from 'nodemailer-express-handlebars';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendEmail = async (userEmail, subject, plainText, data) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const handlebarOptions = {
            viewEngine: {
                extname: '.hbs',
                partialsDir: path.resolve(__dirname, './views/email'),
                defaultLayout: false
            },
            viewPath: path.resolve(__dirname, './views/email'),
            extName: '.hbs'
        };

        // ✅ Use the correct plugin for Nodemailer
        transporter.use('compile', nodemailerExpressHandlebars(handlebarOptions));

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: userEmail,
            subject: subject,
            text: plainText,
            template: 'contact',
            context: data
        };

        const mailRes = await transporter.sendMail(mailOptions);
        console.log('mailRes', mailRes);

        if (mailRes.accepted.length > 0) {
            return 'Email sent successfully';
        } else if (mailRes.rejected.length > 0) {
            return 'Email not sent';
        } else {
            return 'Email server error';
        }
    } catch (error) {
        console.error('SendEmail Error:', error.message);
        return error.message;
    }
};
