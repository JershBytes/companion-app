const express = require('express');
const app = express();

const PORT = process.env.port || 5000;

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/public/index.html')
})

// Middleware
app.use(express.static('public'));



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



