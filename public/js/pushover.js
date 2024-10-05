import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const pushoverUrl = 'https://api.pushover.net/1/messages.json';

// Function to send Pushover notification
export const sendPushoverNotification = async (message) => {
  try {
    const response = await axios.post(pushoverUrl, {
      token: process.env.PUSHOVER_API_TOKEN,
      user: process.env.PUSHOVER_USER_KEY,
      message: message,
    });

    console.log('Pushover Notification Sent:', response.data);
    return response.data; // Return the response for further processing
  } catch (error) {
    console.error('Error sending Pushover notification:', error);
    throw error; // Throw the error for handling in the calling function
  }
};

// Function to create a formatted message from form data and send notification
export const notifyFromForm = async (formData) => {
  const { fullname, age, email, hobbies, favfood, ...questions } = formData;

  // Create a formatted message for Pushover
  const message = `
    New Submission from ${fullname} (${email})
    Age: ${age}
    Hobbies: ${hobbies}
    Favorite Food: ${favfood}

    Responses:
    - Like About me: ${questions.question1}
    - Ideal first date: ${questions.question2}
    - Perfect Saturday: ${questions.question3}
    - Describe our vibe: ${questions.question4}
    - Cheer up strategy: ${questions.question5}
    - Movie genre: ${questions.question6}

    Background Check Responses:
    - Criminal conviction: ${questions.hrq1}
    - Recreational drugs: ${questions.hrq2}
    - Current partners: ${questions.hrq3}
    - Situationships: ${questions.hrq4}
    - Kids involved: ${questions.hrq5}
    - Employment status: ${questions.hrq6}
    - Family relationships: ${questions.hrq7}
    - Long-term relationship or fling: ${questions.hrq8}
    - Feelings about guy/girl relationships: ${questions.hrq9}
  `;

  // Send the formatted message to Pushover and return the response
  return await sendPushoverNotification(message);
};
