import passportMiddleware from "apiUtils/passportMiddleware";

const postLogoutCallback = async (req, res) => {
  const redirectTo = (req.session.redirectTo === "/") ? "/profile" : req.session.redirectTo;
  res.redirect(redirectTo || "/");
};

export default passportMiddleware(postLogoutCallback);
