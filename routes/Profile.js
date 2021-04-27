const router = require("express").Router();

const authCheck = (req, res, next) => {
  //user logged in check
  if (!req.user) {
    res.redirect("/login");
  } else {
    //if logged in go to below or next middleware
    next();
  }
};
router.get("/", authCheck, (req, res) => {
  res.send(req.user);
});
module.exports = router;
