import passportMiddleware from "apiUtils/passportMiddleware";

const token = async (req, res) => {
  req.session.redirectTo = req.headers.Referer;
  if (req.session && req.session.passport) {
    try {
      const user = JSON.parse(req.session.passport.user);
      const { accessToken } = user;

      if (!accessToken) {
        return res.status(500).send("User is missing credentials");
      }

      return res.status(200).send(JSON.stringify({ accessToken }));
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  // Anonymous user
  return res.status(200).send(JSON.stringify({ anonymous: true }));
};

export default passportMiddleware(token);
