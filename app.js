var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Twitter = require('twit');
var body_parser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const tweet = require('./models/tweet');

mongoose.connect("mongodb+srv://anmol:rvtKFnFFX6qINdg5@cluster0-hgwqg.mongodb.net/test?retryWrites=true&w=majority",
{useNewUrlParser: true})
.then(() => {
  console.log("Connection Successful")
})
.catch(() => {
  console.log("Connection Unsuccessful!")
});

var app = express();
app.use(body_parser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const client = new Twitter({
  consumer_key: 'rWtF3uqFQ6ZQIq8qH36GvlUCo',
  consumer_secret: 'ZfoqZiwGCeBYtjMnLZe8nYdbZ5LnupAM1pBvmIOHqxHlmkw9Rz',
  access_token: '233907734-s6eQ92LicZSyZ3qHSHne3TbD3rVj2amvihTxTzGC',
  access_token_secret: '6MAOyy30heFYivH0sdL93cntPGyaFa695fGjQ1Qhuw5fU'
});

app.get('/home_timeline', (req, res) => {
  const params = { tweet_mode: 'extended', count: 10 };
  
  client
    .get(`statuses/home_timeline`, params)
    .then(timeline => {
      res.send(timeline);
    })
    .catch(error => {
    res.send(error);
  });
});

app.get('/mentions_timeline', (req, res) => {
  const params = { tweet_mode: 'extended', count: 10 };
 
  client
    .get(`statuses/mentions_timeline`, params)
    .then(timeline => {
     
      res.send(timeline);
    })
    .catch(error => {
    res.send(error);
  });
    
});

app.post('/favorite/:id', (req, res) => {
  const path = (req.body.state) ? 'create' : 'destroy';
  
  client
    .post(`favorites/${path}`, {id: req.params.id})
    .then(tweet => res.send(tweet))
    .catch(error => res.send(error));
    tweetdb.save();
    console.log('Favourited');
});

app.post('/add',function (req, res) {
  const tweetdb = new tweet({
    tweet_id : req.body.id,
    username: req.body.name
  });
  tweetdb.save()
    .then(tweet => {
    res.status(200).json({'adUnit': 'AdUnit in added successfully'});
    console.log(tweetdb);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

app.listen(3000, () => {
  console.log('server running!!');
})

module.exports = app;
