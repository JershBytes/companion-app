const express = require('require');
const app = express()

const PORT = process.env.port || 5000;

// Middleware
app.use(express.static('public'));




app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`)
})

