const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "v.v.derkach@meta.ua",
    pass: "VolDerVol25051997",
  },
});

async function sendEmail({ userName, userEmail, userMessage }) {
  const output = ` <h1 style="color: green">Вітаємо! Ви отримали листа від ${userName}</h1>

  <p>Контактинй email:${userEmail}</p>

  <p>Текст повідомлення: ${userMessage}</p>

  <p style="color: blue">Дякуюємо!</p>`;
  const info = await transporter.sendMail({
    from: "v.v.derkach@meta.ua", // sender address
    to: "abc1971h@gmail.com", // list of receivers
    subject: "Planets and space website", // Subject line
    text: userMessage, // plain text body
    html: output,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;
