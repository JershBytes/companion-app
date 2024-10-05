// pushover.js

import config from './config.js'; // Import the configuration
import axios from 'axios'; // Import axios

export function saveData() {
  const formFields = [
    'fullname', 'age', 'hobbies', 'favfood', 'email',
    'question1', 'question2', 'question3',
    'question4', 'question5', 'question6',
    'hrq1', 'hrq2', 'hrq3', 'hrq4', 'hrq5',
    'hrq6', 'hrq7', 'hrq8', 'hrq9'
  ];

  const formData = {};
  formFields.forEach(field => {
    formData[field] = document.getElementById(field).value;
  });

  const messageBody = `
    New application received from ${formData.fullname} at ${formData.email}!

    ### Basic Info ###
    Full Name: ${formData.fullname}
    Birthday: ${formData.age}
    Email: ${formData.email}
    Hobbies: ${formData.hobbies}
    Favorite Food: ${formData.favfood}

    ### Questionnaire ###
    What do you like about me?: ${formData.question1}
    Perfect Saturday: ${formData.question2}
    Cheer-up Strategy: ${formData.question3}
    Vibe Description: ${formData.question4}
    Ideal First Date: ${formData.question5}
    Movie Genre: ${formData.question6}

    ### HR Questionnaire ###
    HR Questions:
    Crime Conviction: ${formData.hrq1}
    Drug Use: ${formData.hrq2}
    Current Relationships: ${formData.hrq3}
    Situationships: ${formData.hrq4}
    Kids' Activities: ${formData.hrq5}
    Employment Status: ${formData.hrq6}
    Family Relationship: ${formData.hrq7}
    Relationship Type: ${formData.hrq8}
    Additional Comments: ${formData.hrq9}
  `;

  // Send to Pushover
  const userKey = config.pushoverUserKey;  // Use the user key from config
  const apiToken = config.pushoverToken;    // Use the token from config

  const bodyFormDataPushover = new URLSearchParams();
  bodyFormDataPushover.append('token', apiToken);
  bodyFormDataPushover.append('user', userKey);
  bodyFormDataPushover.append('message', messageBody); // Ensure messageBody is defined

  const urlPushover = "https://api.pushover.net/1/messages.json";

  axios({
      method: "post",
      url: urlPushover,
      data: bodyFormDataPushover.toString(),
      headers: {
          "Content-Type": "application/x-www-form-urlencoded" // Pushover needs this content type
      }
  })
  .then((response) => console.log("Pushover notification sent successfully!", response.data))
  .catch((error) => {
      if (error.response) {
          console.error("Pushover Error response:", error.response.data);
      } else if (error.request) {
          console.error("Pushover Error request:", error.request);
      } else {
          console.error("Pushover General error:", error.message);
      }
  });
}
