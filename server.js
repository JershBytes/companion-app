import express from 'express';
import { notifyFromForm as notifyEmail } from './public/js/mailer.js'; // Import the notification function from mailer.js
import { notifyFromForm as notifyGotify } from './public/js/gotify.js'; // Import the notification function from pushover.js

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files

// Handle form submission
app.post('/submit', (req, res) => {
  const formData = req.body; // Capture the form data
  console.log('Received Form Data:', formData);

  // Trigger email notification
  notifyEmail(formData);

  // Trigger Pushover notification
  notifyGotify(formData);

  // Respond to the frontend
  res.json({ message: 'Notifications sent successfully!' });
});

// Define the /notify route
app.post('/notify', (req, res) => {
  const notificationData = req.body; // Get the notification data from the request body
  console.log('Received notification data:', notificationData); // Log for debugging

  // Call the notification functions
  Promise.all([
    notifyEmail(notificationData),
    notifyGotify(notificationData)
  ])
    .then(responses => {
      res.status(200).json({ message: 'Notifications sent successfully', responses });
    })
    .catch(error => {
      console.error('Error sending notifications:', error);
      res.status(500).json({ message: 'Error sending notifications', error });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
