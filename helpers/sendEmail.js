import nodemailer from "nodemailer";

const { MY_EMAIL, MY_PASSWORD } = process.env;

// Створюємо транспорт для відправки email
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: MY_EMAIL,
        pass: MY_PASSWORD,
    },
});

// Функція для відправки email
export const sendEmail = async (to, subject, text) => {
    try {
        // Налаштовуємо дані для відправки email
        const mailOptions = {
            from: myEMAIL, // Ваш email
            to: to, // Адреса отримувача
            subject: subject, // Тема листа
            text: text, // Текст листа
        };

        // Відправляємо email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        next(error);
    }
};

