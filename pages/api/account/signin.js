import passportMiddleware, { passport } from "apiUtils/passportMiddleware";

const singIn = async (req, res) => {
  req.session.redirectTo = req.headers.Referer;
  passport.authenticate("oauth2", {
    loginAction: "signin",
    failureRedirect: "/"
  })(req, res, (...args) => {});
};

export default passportMiddleware(singIn);
