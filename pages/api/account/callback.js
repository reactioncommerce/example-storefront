import passportMiddleware, { passport } from "apiUtils/passportMiddleware";

const callback = async (req, res) => {
  passport.authenticate("oauth2", {
    failureRedirect: "/"
  })(req, res, (...args) => {
    res.redirect(req.session.redirectTo || "/");
  });
};

export default passportMiddleware(callback);
