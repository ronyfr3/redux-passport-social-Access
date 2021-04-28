require("dotenv").config();
const express = require("express");
const cors = require("cors");
//cookie session control user session(from serializer,user obj)
//it encrypt cookie help of a key then send encrypted cookie to the browser,then after deserialize we decrypt that cookie and get original user info
const cookieSession = require("cookie-session");
const passport = require("passport");
const app = express();
app.use(cors());
//require passportsetup
require("./controllers/Passport");
//MongoDB
const connectDB = require("./Mongodb");
connectDB();
//cookie session
//it works after passport initialize
//passport.serializer encrypts user.id
//cookiesession convert user.id(from passport.serialize) to a cookie not plain text id to send the browser
//passport.deserializer decrypt user.id from browser
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //1day 30day=30 * 24 * 60 * 60 * 1000
    keys: ["encryptCookieWithThisKey"],
  })
);
//passport initialize
app.use(passport.initialize());
// passport.session control a user login in
app.use(passport.session());

//routes
app.use("/auth", require("./routes/Auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("App listening on port", PORT));
