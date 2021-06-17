import passportMiddleware, { passport } from "apiUtils/passportMiddleware";

const callback = async (req, res) => {
  passport.authenticate("oauth2", {
    failureRedirect: "/"
    // eslint-disable-next-line no-unused-vars
  })(req, res, (...args) => {
    res.redirect(req.session.redirectTo || "/");
  });
};

export default passportMiddleware(callback);
