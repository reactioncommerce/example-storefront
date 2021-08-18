import passportMiddleware, { passport } from "apiUtils/passportMiddleware";

const singIn = async (req, res) => {
  req.session.redirectTo = req.headers.Referer;
  passport.authenticate("oauth2", {
    loginAction: "signin",
    failureRedirect: "/"
    // eslint-disable-next-line no-unused-vars
  })(req, res, (...args) => {});
};

export default passportMiddleware(singIn);
