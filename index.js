const express = require('express');
const cookieParser = require('cookie-parser'); // parse cookie header and populate req.cookies
const bodyParser = require('body-parser'); // parses incoming request bodies (req.body)
const dotenv = require('dotenv');

const app = express();
const db = require('./config/database');
const {  MONGODB_URL, SESSION_SECRET_KEY } = process.env;
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });
const PORT=process.env.PORT || 5000;
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');
// const PORT=process.env.PORT|| 8000
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(expressLayouts);

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
  name:'Employee review system',
  //TODO change secret before deployment
  secret: "swdswdsd",
  saveUninitialized: false,
  resave: false,
  cookie:{
      maxAge: (1000*60*100)
  },
  store: new MongoStore({
      mongooseConnection: db,
      autoRemove: 'disabled',
  },
  function(err){console.log(err || 'connet-mongo setup done')}

  )

  
}))

app.use(passport.initialize());
app.use(passport.session());

// sets the authenticated user in the response
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen( PORT, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${PORT}`);
});
