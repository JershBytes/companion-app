import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const pushoverUrl = 'https://api.pushover.net/1/messages.json';

export const sendPushoverNotification = async (message) => {
  try {
    const response = await axios.post(pushoverUrl, {
      token: process.env.PUSHOVER_API_TOKEN,
      user: process.env.PUSHOVER_USER_KEY,
      message: message,
    });

    console.log('Pushover Notification Sent:', response.data);
  } catch (error) {
    console.error('Error sending Pushover notification:', error);
  }
};
