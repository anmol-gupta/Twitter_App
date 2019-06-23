const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    tweet_id: {type: Number},
    username: {type: String}
});

module.exports = mongoose.model('Tweet', tweetSchema);