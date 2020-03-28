import passportMiddleware, { passport } from "apiUtils/passportMiddleware";

const signUp = async (req, res) => {
  req.session.redirectTo = req.headers.Referer;
  passport.authenticate("oauth2", {
    loginAction: "signup",
    failureRedirect: "/"
  })(req, res, (...args) => {});
};

export default passportMiddleware(signUp);
