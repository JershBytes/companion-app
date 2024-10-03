// Import necessary modules
const nodeMailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Create HTML email content
const html = (formData) => `
<h1 align="center"> New application received from ${formData.fullname} at ${formData.email}! </h1>

<h2> Basic Info </h2>
Full Name: ${formData.fullname}<br>
Birthday: ${formData.age}<br>
Email: ${formData.email}<br>
Hobbies: ${formData.hobbies}<br>
Favorite Food: ${formData.favfood}<br>

<h2> Questionnaire </h2>
What do you like about me?: ${formData.question1}<br>
Perfect Saturday: ${formData.question2}<br>
Cheer-up Strategy: ${formData.question3}<br>
Vibe Description: ${formData.question4}<br>
Ideal First Date: ${formData.question5}<br>
Movie Genre: ${formData.question6}<br>

<h2> HR Questionnaire </h2>
Crime Conviction: ${formData.hrq1}<br>
Drug Use: ${formData.hrq2}<br>
Current Relationships: ${formData.hrq3}<br>
Situationships: ${formData.hrq4}<br>
Kids' Activities: ${formData.hrq5}<br>
Employment Status: ${formData.hrq6}<br>
Family Relationship: ${formData.hrq7}<br>
Relationship Type: ${formData.hrq8}<br>
Additional Comments: ${formData.hrq9}<br>
`;

// Array of recipient emails
const emails = ['contact@rossjm.net'];

async function main(formData) {
  // Create transporter with environment variables
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send email
  const info = await transporter.sendMail({
    from: `"App Admin" <${process.env.EMAIL_USER}>`, // Use the email from env
    to: emails,
    subject: `New application received from ${formData.fullname} at ${formData.email}!`,
    html: html(formData), // Call the html function with formData
  });

  console.log("Message sent: " + info.messageId);
  console.log(info.accepted);
  console.log(info.rejected);
}

// Call the main function with example form data
main(formData).catch(console.error);
