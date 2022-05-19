const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/profile", [authJwt.verifyToken], controller.profile);
  app.get("/api/accountNumber", [authJwt.verifyToken], controller.account_number);
  app.get("/api/identityNumber", [authJwt.verifyToken], controller.identity_number);
};