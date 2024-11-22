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

// Function to create a formatted message from form data and send notification
export const notifyFromForm = async (formData) => {
  try {
    // Destructure formData into individual variables
    const { fullname, email, age, hobbies, favfood, questions } = formData;

    // Validate required fields
    if (!fullname || !email) {
      throw new Error('Missing required fields: fullname or email');
    }

    // Calculate the real age from the age input
    const realAge = calculateAge(age); // Use the calculateAge function

    // Construct the message using dedent
    const message = dedent`
      New Submission from ${fullname} (${email})
      Age: ${realAge !== null ? realAge : 'Invalid date format' || 'Not provided'}
      Hobbies: ${hobbies || 'Not provided'}
      Favorite Food: ${favfood || 'Not provided'}

      Responses:
      - Like About me: ${questions?.question1 || 'No response given'}
      - Ideal first date: ${questions?.question2 || 'No response given'}
      - Perfect Saturday: ${questions?.question3 || 'No response given'}
      - Describe our vibe: ${questions?.question4 || 'No response given'}
      - Cheer up strategy: ${questions?.question5 || 'No response given'}
      - Movie genre: ${questions?.question6 || 'No response given'}

      Background Check Responses:
      - Criminal conviction: ${questions?.hrq1 || 'No response given'}
      - Recreational drugs: ${questions?.hrq2 || 'No response given'}
      - Current partners: ${questions?.hrq3 || 'No response given'}
      - Situationships: ${questions?.hrq4 || 'No response given'}
      - Kids involved: ${questions?.hrq5 || 'No response given'}
      - Employment status: ${questions?.hrq6 || 'No response given'}
      - Family relationships: ${questions?.hrq7 || 'No response given'}
      - Long-term relationship or fling: ${questions?.hrq8 || 'No response given'}
      - Feelings about guy/girl relationships: ${questions?.hrq9 || 'No response given'}
    `;

    // Send the formatted message to Gotify and return the response
    return await sendGotifyNotification(message);
  } catch (error) {
    console.error('Error in notifyFromForm:', error.message);
    throw error; // Propagate the error to the caller
  }
};
