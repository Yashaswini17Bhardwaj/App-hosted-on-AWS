const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World from Demo App!'); // Fixed response text to match test
});

module.exports = app; // Export the app for testing
