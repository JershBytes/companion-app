import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified

// Serve static files from the 'public' directory
app.use(express.static(path.join(process.cwd(), 'public')));

// Define a route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html')); // Send the HTML file
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
