import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Set up the transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    logger: true, // Log the messages to console
    debug: true,  // Include SMTP traffic in the logs
});


// Function to send an email to multiple recipients
export const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to.join(', '), // Join the array into a comma-separated string
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Function to format and send email using form data
export const notifyFromForm = (formData) => {
    const { fullname, age, email, hobbies, favfood, ...questions } = formData;

    // Create a formatted HTML message
    const message = `
        <h2>New Submission from <strong>${fullname}</strong> at <a href="mailto:${email}">${email}</a></h2>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Hobbies:</strong> ${hobbies}</p>
        <p><strong>Favorite Food:</strong> ${favfood}</p>

        <h3>Responses:</h3>
        <ul>
            <li><strong>Like About me:</strong> ${questions.question1}</li>
            <li><strong>Ideal first date:</strong> ${questions.question2}</li>
            <li><strong>Perfect Saturday:</strong> ${questions.question3}</li>
            <li><strong>Describe our vibe:</strong> ${questions.question4}</li>
            <li><strong>Cheer up strategy:</strong> ${questions.question5}</li>
            <li><strong>Movie genre:</strong> ${questions.question6}</li>
        </ul>

        <h3>Background Check Responses:</h3>
        <ul>
            <li><strong>Criminal conviction:</strong> ${questions.hrq1}</li>
            <li><strong>Recreational drugs:</strong> ${questions.hrq2}</li>
            <li><strong>Current partners:</strong> ${questions.hrq3}</li>
            <li><strong>Situationships:</strong> ${questions.hrq4}</li>
            <li><strong>Kids involved:</strong> ${questions.hrq5}</li>
            <li><strong>Employment status:</strong> ${questions.hrq6}</li>
            <li><strong>Family relationships:</strong> ${questions.hrq7}</li>
            <li><strong>Long-term relationship or fling:</strong> ${questions.hrq8}</li>
            <li><strong>Feelings about guy/girl friendships:</strong> ${questions.hrq9}</li>
        </ul>
    `;

    // Multiple recipients can be handled with an array of emails
    const recipients = ['contact@rossjm.net', 'me@rossjm.net']; // Add more emails as needed
    const subject = `New Submission from ${fullname} at ${email}`;
    
    // Send the email to all recipients
    sendMail(recipients, subject, message);
};
