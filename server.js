const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

const users = {}
const sessions = {}

app.use(bodyParser.urlencoded({ 
    extended: false}));

app.set('view engine', 'ejs');

app.get('/', function(req,res) {
    res.render('index')
})

app.post('/signup', function(req, res) {
  // remember, you'll need body-parser for this
  const newUser = req.body

  // you'll need to do some validation here, like:
  //   - is the username field empty?
  //   - is either password field empty?
  //   - do the two password fields match?
  //   - is there already a user with this username?

  users[newUser.username] = {
    username: newUser.username,
    password: newUser.password,
    signUpTime: Date.now()
  }

  // Assuming everything is all good, you'll want to "log in"
  // by populating the session variable:

  // this "session id" is just a random string we use as a key
  // on the sessions object. It will be the cookie we set on the
  // user's browser via the Set-Cookie response header
  const sessionId = 'session-' + Math.random()
  sessions[sessionId] = {
    loginTime: Date.now(),
    user: users[newUser.username]
  }
  
  // Use Set-Cookie to put sessionId on the client as a cookie
  res.set('Set-Cookie', 'my_app_session=' + sessionId)
  res.render('index')
})

app.post('/login', function (req, res) {
  // check that username and password match a know user in the users
  // object. If you find one and the password matches, add a new 
  // session into the sessions object and use the Set-Cookie header
  // just like in the signup handler
})
app.listen(1337);
console.log('listening on port 1337...');
