const express = require('express')
const app = express();
const request = require('request');
const cors = require('cors');

app.use(cors());
app.get('/search', (req, res) => {
  request(`https://api.github.com/search/users?q=${req.query.q}&client_id=5303119942343b7a36c8&client_secret=34b02c253b8e1e24709a9cb6b24bc8a26bd0f5eb`, {
    headers: {
      'User-Agent': 'Github'
    }
  }, function (error, response) {
    if (!error && response.statusCode == 200) {
      res.send(JSON.parse(response.body));
    }
  });
});

app.get('/users', (req, res) => {
  request(`https://api.github.com/users/${req.query.u}?client_id=5303119942343b7a36c8&client_secret=34b02c253b8e1e24709a9cb6b24bc8a26bd0f5eb`, {
    headers: {
      'User-Agent': 'Github'
    }
  }, function (error, response) {
    if (!error && response.statusCode == 200) {
      res.send(JSON.parse(response.body));
    }
  });
});

app.get('/repos', (req, res) => {
  request(`https://api.github.com/users/${req.query.u}/repos?client_id=5303119942343b7a36c8&client_secret=34b02c253b8e1e24709a9cb6b24bc8a26bd0f5eb`, {
    headers: {
      'User-Agent': 'Github'
    }
  }, function (error, response) {
    if (!error && response.statusCode == 200) {
      res.send(JSON.parse(response.body));
    }
  });
});

app.listen(process.env.PORT, () => console.log('Example app listening on port 3000!'));
