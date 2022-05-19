const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  const user = new User({
    userName: req.body.username,
    accountNumber: req.body.account_number,
    emailAddress: req.body.email,
    identityNumber : req.body.identity_number
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration // 24 hours
      });
      var token_refresh = jwt.sign({ id: user.id }, config.secret_refresh, {
        expiresIn: config.jwtRefreshExpiration // 24 hours
      });
      var authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        accessToken: token,
        refreshToken:token_refresh
      });
    });
};

exports.refreshToken = async (req, res) => {
  try {
    
    let newAccessToken = jwt.sign({ id: req.userId }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    let refreshAccessToken = jwt.sign({ id: req.userId }, config.secret_refresh, {
      expiresIn: config.jwtRefreshExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshAccessToken,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};