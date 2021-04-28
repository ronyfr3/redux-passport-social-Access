const router = require("express").Router();
const passport = require("passport");

//google
// passport object(above we require from passport package) holds the google strategy which is in controllers/passport.js
// after user click google btn a screen pops up
// this url->localhost:3000/auth/google comes here it goes controllers/passport.js here and
// authenticate users with passport-google strategy
//passport authenticate user and give us ["profile"] obj which holds user info.
//{ scope: ["profile"] }-->means i want to access user profile and email;
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//after login it redirect to auth/google/redirect
//we need to create this page when it redirects
//initially we get unreadable url with callback redirect url
//we have to get user profile information from this url(auth/google/redirect)
//getting user info we need again passport.authenticate('google') this to go controllers/passport.js there we have passport verify callback
//after selecting one of your google account passport run
//This below cb function
// (accessToken, refreshToken, profile, cb) => {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
//then give us user info
router.get(
  "/google/redirect",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {
    //after logged in we get user from req obj  req.user
    res.redirect("/");
    // res.send(req.user.username);
  }
);

//Facebook
router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

router.get("/profile", (req, res) => {
  res.send(req.user);
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
