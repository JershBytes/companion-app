import express from 'express';
import bodyParser from 'body-parser';
import { notifyFromForm } from './public/js/pushover.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Handle the notification from the form submission
app.post('/notify', (req, res) => {
  notifyFromForm(req.body);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
