/* eslint-disable no-undef */
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;  // PORT env var provided by Heroku

app.use(express.static(publicPath));

app.get('*', (req, resp) => {
  resp.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('express server is up');
});