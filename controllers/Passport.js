require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const LoginUser = require("../models/LoginUsers");

//serializer deserialize works after user logged in
//getting user.id from verify cb function
//serialize send user.id to cookie
passport.serializeUser((user, done) => {
  //passing user.id to deserialize or next stage
  done(null, user.id);
});
//deserialize get that id from cookie and retrive user info
passport.deserializeUser((id, done) => {
  //check whose id
  LoginUser.findById(id).then((user) => {
    //after knowing userid we need to pass this user to next stage
    done(null, user);
  });
});

//GOOGLE LOGIN
// The strategy also requires a verify callback, which receives the access token and optional refresh token, as well as profile which contains the authenticated user's Google profile. The verify callback must call cb providing a user to complete authentication.

//GOOGLE LOGIN
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      //this comes from google dev console credentials->http://localhost:3000/auth/google/redirect
      callbackURL: "/auth/google/redirect",
      proxy: true,
    },
    //passport varify callback function
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      //profile(json obj)->name,photo,id
      //check user already exist
      LoginUser.findOne({
        userId: profile.id,
      }).then((existUser) => {
        if (existUser) {
          //exsists already
          // console.log("existUser", existUser);
          //if user exist it will go in serialize
          done(null, existUser);
        } else {
          //save newUser to db
          new LoginUser({
            username: profile.displayName,
            userId: profile.id,
            picture: profile._json.picture,
          })
            .save()
            .then((newUser) => {
              console.log("new user", newUser);
              //new user will go in serialize
              done(null, newUser);
            });
        }
      });
    }
  )
);

//FACEBOOK LOGIN
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENTID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/redirect",
      proxy: true,
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile)
      LoginUser.findOne({
        userId: profile.id,
      }).then((existUser) => {
        if (existUser) {
          //exsists already
          // console.log("existUser", existUser);
          //if user exist it will go in serialize
          done(null, existUser);
        } else {
          //save newUser to db
          new LoginUser({
            username: profile.displayName,
            userId: profile.id,
            picture: profile._json.picture,
          })
            .save()
            .then((newUser) => {
              // console.log("new user", newUser);
              //new user will go in serialize
              done(null, newUser);
            });
        }
      });
    }
  )
);
