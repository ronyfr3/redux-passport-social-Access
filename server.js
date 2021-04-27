const express = require("express");
const cors = require("cors");
const passport = require("passport");
//cookie session control user session(from serializer,user obj)
//it encrypt cookie help of a key then send encrypted cookie to the browser,then after deserialize we decrypt that cookie and get original user info
const cookieSession = require("cookie-session");
const app = express();
//cors
app.use(cors());

//cookie session
//it works after passport initialize
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["encryptCookieWithThisKey"],
  })
);
//MongoDB
const connectDB = require("./Mongodb");
connectDB();

//require passportsetup
require("./controllers/Passport");
//passport initialize
app.use(passport.initialize());
// passport.session control a user login in
app.use(passport.session());

//routes
app.use("/auth", require("./routes/Auth"));
//get req.user from below routes
app.use("/profile", require("./routes/Profile"));

const PORT = 5000;
app.listen(PORT, () => console.log("App listening on port", PORT));
