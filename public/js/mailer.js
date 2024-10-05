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

    // Create a formatted message similar to the Pushover notification
    const message = `
        New Submission from *${fullname}* at ${email}
        *Age*: ${age}
        *Email*: ${email}
        *Hobbies*: ${hobbies}
        *Favorite Food*: ${favfood}

        *Responses:*
        - Like About me: ${questions.question1}
        - Ideal first date: ${questions.question2}
        - Perfect Saturday: ${questions.question3}
        - Describe our vibe: ${questions.question4}
        - Cheer up strategy: ${questions.question5}
        - Movie genre: ${questions.question6}

        *Background Check Responses:*
        - Criminal conviction: ${questions.hrq1}
        - Recreational drugs: ${questions.hrq2}
        - Current partners: ${questions.hrq3}
        - Situationships: ${questions.hrq4}
        - Kids involved: ${questions.hrq5}
        - Employment status: ${questions.hrq6}
        - Family relationships: ${questions.hrq7}
        - Long-term relationship or fling: ${questions.hrq8}
        - Feelings about guy/girl friendships: ${questions.hrq9}
    `;

    // Multiple recipients can be handled with an array of emails
    const recipients = ['contact@rossjm.net', 'me@rossjm.net']; // Add more emails as needed
    const subject = `New Submission from ${fullname} at ${email}`;
    
    // Send the email to all recipients
    sendMail(recipients, subject, message);
};
