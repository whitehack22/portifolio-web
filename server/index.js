import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sendEmail } from './mailer.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (_req, res) => {
    res.send('Hello Express ✅');
});

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    const subject = `New Contact from Portfolio - ${name}`;
    const plainText = message;

    const result = await sendEmail(email, subject, plainText, {
        name,
        email,
        message
    });

    if (result === 'Email sent successfully') {
        res.status(200).json({ message: result });
    } else {
        res.status(500).json({ error: result });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
