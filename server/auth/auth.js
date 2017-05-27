const cbURL = process.env.cbURL || 'http://127.0.0.1:3000/auth/twitter/callback'

module.exports = {
  twitterAuth: {
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: cbURL
  }
}