const github = require('../helpers/github.js');
const db = require('../database/index.js');

const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({extended: false})); //params
app.use(express.json()); //body

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let user = req.body.user;

  github.getReposByUsername(user)
    .then(results => {
      results.data.forEach(repo => {
        db.save(repo);
      })
    })
    .then(results => {
      res.send(201);
    })
    .catch(err => {
      res.send(500);
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.read()
    .then(results => {
      res.send(results)
    })
    .catch(err => {
      res.send(500)
    })
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

