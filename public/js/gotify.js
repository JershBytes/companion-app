import axios from 'axios';
import dotenv from 'dotenv';
import dedent from 'dedent';

dotenv.config(); // Load environment variables

const GOTIFY_URL = process.env.GOTIFY_URL; // URL for the Gotify API

// Function to send Gotify notification
export const sendGotifyNotification = async (message) => {
  try {
    const response = await axios.post(GOTIFY_URL, {
      message: message,
    });

    console.log('Gotify Notification Sent:', response.data);
    return response.data; // Return the response for further processing
  } catch (error) {
    console.error('Error sending Gotify notification:', error.response?.data || error.message);
    throw error; // Throw the error for handling in the calling function
  }
};

// Function to create a formatted message from form data and send notification
export const notifyFromForm = async (formData) => {
  try {
    // Destructure formData into individual variables
    const { fullname, email, age, hobbies, favfood, questions } = formData;

    // Validate required fields
    if (!fullname || !email) {
      throw new Error('Missing required fields: fullname or email');
    }

    // Construct the message using dedent
    const message = dedent`
      New Submission from ${fullname} (${email})
      Age: ${age || 'Not provided'}
      Hobbies: ${hobbies || 'Not provided'}
      Favorite Food: ${favfood || 'Not provided'}

      Responses:
      - Like About me: ${questions?.question1 || 'No response'}
      - Ideal first date: ${questions?.question2 || 'No response'}
      - Perfect Saturday: ${questions?.question3 || 'No response'}
      - Describe our vibe: ${questions?.question4 || 'No response'}
      - Cheer up strategy: ${questions?.question5 || 'No response'}
      - Movie genre: ${questions?.question6 || 'No response'}

      Background Check Responses:
      - Criminal conviction: ${questions?.hrq1 || 'No response'}
      - Recreational drugs: ${questions?.hrq2 || 'No response'}
      - Current partners: ${questions?.hrq3 || 'No response'}
      - Situationships: ${questions?.hrq4 || 'No response'}
      - Kids involved: ${questions?.hrq5 || 'No response'}
      - Employment status: ${questions?.hrq6 || 'No response'}
      - Family relationships: ${questions?.hrq7 || 'No response'}
      - Long-term relationship or fling: ${questions?.hrq8 || 'No response'}
      - Feelings about guy/girl relationships: ${questions?.hrq9 || 'No response'}
    `;

    // Send the formatted message to Gotify and return the response
    return await sendGotifyNotification(message);
  } catch (error) {
    console.error('Error in notifyFromForm:', error.message);
    throw error; // Propagate the error to the caller
  }
};
