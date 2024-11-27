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
    const { fullname, email, age, hobbies, favfood } = formData;

    if (!fullname || !email) {
      throw new Error('Missing required fields: fullname or email');
    }

    const realAge = calculateAge(age);

    const getResponse = (value) => value?.trim() || 'No response';

    const message = dedent`
      New Submission from ${fullname} (${email})
      Age: ${realAge !== null ? realAge : 'Invalid date format'}
      Hobbies: ${hobbies || 'Not provided'}
      Favorite Food: ${favfood || 'Not provided'}

      Responses:
      - Like About me: ${getResponse(formData.question1)}
      - Ideal first date: ${getResponse(formData.question2)}
      - Perfect Saturday: ${getResponse(formData.question3)}
      - Describe our vibe: ${getResponse(formData.question4)}
      - Cheer up strategy: ${getResponse(formData.question5)}
      - Movie genre: ${getResponse(formData.question6)}

      Background Check Responses:
      - Criminal conviction: ${getResponse(formData.hrq1)}
      - Recreational drugs: ${getResponse(formData.hrq2)}
      - Current partners: ${getResponse(formData.hrq3)}
      - Situationships: ${getResponse(formData.hrq4)}
      - Kids involved: ${getResponse(formData.hrq5)}
      - Employment status: ${getResponse(formData.hrq6)}
      - Family relationships: ${getResponse(formData.hrq7)}
      - Long-term relationship or fling: ${getResponse(formData.hrq8)}
      - Feelings about guy/girl relationships: ${getResponse(formData.hrq9)}
    `;

    return await sendGotifyNotification(message);
  } catch (error) {
    console.error('Error in notifyFromForm:', error.message);
    throw error;
  }
};
