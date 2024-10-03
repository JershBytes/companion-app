// config.js
require('dotenv').config();

const config = {
    pushoverToken: process.env.PUSHOVER_TOKEN,
    pushoverUserKey: process.env.PUSHOVER_USER_KEY,
};

module.exports = config;
