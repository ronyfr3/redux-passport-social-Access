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
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "646502856565-gfg0igdr52jsncmi957od5oqu133psc3.apps.googleusercontent.com",
      clientSecret: "8m5Gs5aG8xkgOhPdyWLbdQT2",
      //this comes from google dev console credentials->http://localhost:3000/auth/google/redirect
      callbackURL: "/auth/google/redirect",
    },
    //passport varify callback function
    (accessToken, refreshToken, profile, cb) => {
      // console.log(profile);
      //profile(json obj)->name,photo,id
      //check user already exist
      LoginUser.findOne({
        googleId: profile.id,
      }).then((existUser) => {
        if (existUser) {
          //exsists already
          console.log("existUser", existUser);
          //if user exist it will go in serialize
          done(null, existUser);
        } else {
          //save newUser to db
          new LoginUser({
            username: profile.displayName,
            googleId: profile.id,
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
      clientID: "1535006533557168",
      clientSecret: "3a4a7b38c4691ba17cb167004281a3cb",
      callbackURL: "/auth/facebook/redirect",
    },
    function (accessToken, refreshToken, profile, cb) {
      LoginUser.findOne({
        facebookId: profile.id,
      }).then((existUser) => {
        if (existUser) {
          //exsists already
          console.log("existUser", existUser);
          //if user exist it will go in serialize
          done(null, existUser);
        } else {
          //save newUser to db
          new LoginUser({
            username: profile.displayName,
            facebookId: profile.id,
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
