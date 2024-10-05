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

export const notifyFromForm = (formData) => {
  const { fullname, age, email, hobbies, favfood, ...questions } = formData;

  // Create a formatted message
  const message = `
    New Submission from ${fullname} at ${email}:
    *Age*: ${age}
    *Email*: ${email}
    *Hobbies*: ${hobbies}
    *Favorite Food*: ${favfood}

    *Responses:*
    - What do you like about me? ${questions.question1}
    - What is your ideal first date? ${questions.question2}
    - How would we spend our perfect Saturday together? ${questions.question3}
    - If you could describe our vibe, what would it be? ${questions.question4}
    - What is your go-to strategy for cheering someone up after a long day? ${questions.question5}
    - If we were starring in a movie together, what genre would it be and why? ${questions.question6}

    *Background Check Responses:*
    - Have you ever been convicted of a crime? ${questions.hrq1}
    - Do you use drugs recreationally outside of Weed, Tobacco, and vaping? ${questions.hrq2}
    - Do you currently have hoes? ${questions.hrq3}
    - Are there any long-standing situationships we need to be aware of? ${questions.hrq4}
    - Are there kids involved? If so, what do they enjoy doing? ${questions.hrq5}
    - Are you employed? If so, how long? ${questions.hrq6}
    - How is your relationship with your family? ${questions.hrq7}
    - Are you looking for a long-term relationship or a fling? ${questions.hrq8}
    - How are your feelings about guy/girl relationships? ${questions.hrq9}
  `;

  // Send the formatted message to Pushover
  sendPushoverNotification(message);
};
