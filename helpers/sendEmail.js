import nodemailer from "nodemailer";

const { myEMAIL, myPASSWORD } = process.env;

// Функція для відправки email
export const sendEmail = async (to, subject, text) => {
    try {
        // Створюємо транспорт для відправки email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: myEMAIL,
                pass: myPASSWORD,
            },
        });

        // Налаштовуємо дані для відправки email
        const mailOptions = {
            from: myEMAIL, // Ваш email
            to: to, // Адреса отримувача
            subject: subject, // Тема листа
            text: text, // Текст листа
        };

        // Відправляємо email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

