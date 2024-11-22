import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Set up the transporter
const transporter = nodemailer.createTransport({
    host: process.env.PROTON_SMTP_SERVER,
    port: process.env.PROTON_SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.PROTON_SMTP_USER,
      pass: process.env.PROTON_SMTP_TOKEN
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: true,
    }
});

// Function to calculate age from date of birth in MM-DD-YYYY or MMDDYYYY format
const calculateAge = (dob) => {
    let month, day, year;

    // Check if the input is in MM-DD-YYYY format
    if (dob.includes('-')) {
        const parts = dob.split('-');
        if (parts.length === 3) {
            month = parseInt(parts[0], 10) - 1; // Month is 0-indexed
            day = parseInt(parts[1], 10);
            year = parseInt(parts[2], 10);
        } else {
            console.error('Invalid date format. Please use MM-DD-YYYY or MMDDYYYY.');
            return null; // or handle as appropriate
        }
    } else {
        // Assume MMDDYYYY format
        month = parseInt(dob.substring(0, 2), 10) - 1; // Month is 0-indexed
        day = parseInt(dob.substring(2, 4), 10);
        year = parseInt(dob.substring(4, 8), 10);
    }

    const birthDate = new Date(year, month, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};


// Function to send an email to multiple recipients
export const sendMail = async (to, subject, text, html) => { // Accept an `html` parameter
    const mailOptions = {
        from: process.env.PROTON_SMTP_USER, // Sender address
        to: to.join(', '), // Join the array into a comma-separated string
        subject,
        text,  // Plain text version of the message
        html,  // HTML version of the message
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

     // Calculate the real age from the age input
    const realAge = calculateAge(age); // Use the calculateAge function

    // Create a formatted HTML message
    const messageHtml = `
        <h1>New Submission from <strong>${fullname}</strong> at ${email}</h1>
        <p><strong>Age:</strong> ${realAge !== null ? realAge : 'Invalid date format'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Hobbies:</strong> ${hobbies}</p>
        <p><strong>Favorite Food:</strong> ${favfood}</p>
        <h2>Responses:</h2>
        <ul>
            <li><strong>Like About me:</strong> ${questions.question1}</li>
            <li><strong>Ideal first date:</strong> ${questions.question2}</li>
            <li><strong>Perfect Saturday:</strong> ${questions.question3}</li>
            <li><strong>Describe our vibe:</strong> ${questions.question4}</li>
            <li><strong>Cheer up strategy:</strong> ${questions.question5}</li>
            <li><strong>Movie genre:</strong> ${questions.question6}</li>
        </ul>
        <h2>Background Check Responses:</h2>
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
    const recipients = process.env.RECIPIENTS.split(',');
    const subject = `New Submission from ${fullname}`;

    // Send the email to all recipients with the HTML version of the message
    sendMail(recipients, subject, messageHtml, messageHtml);
};
