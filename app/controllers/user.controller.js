const db = require("../models");
const config = require("../config/auth.config");
const {v4 : uuidv4} = require('uuid');
const User = db.user;
const dotenv = require('dotenv');
dotenv.config();
const {
  REDIS_PORT,
  REDIS_URL
} = process.env;
const redis = require('redis');
const redisClient = redis.createClient({
  legacyMode: true,
    socket: {
        port: REDIS_PORT,
        host: REDIS_URL
    }
});
(async () => {
  redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
  });
  redisClient.on('ready', () => console.log('Redis is ready'));

  await redisClient.connect();

  await redisClient.ping();
})();
  exports.profile = async (req, res) => {
    key = 'profile:'+req.userId
    let results = null;
    const value = await redisClient.get(key);
    if (value) {
      res.status(200).send(JSON.parse(value));
      console.log("ADa cache")
    } else {
      console.log("Tidak ada cache",value)
      User.findOne({ id: req.userId }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
          console.log("data",user)
          res.status(500).send({ 
            id: user.id,
            username: user.userName,
            account:user.accountNumber,
            email: user.emailAddress,
            identity_number: user.identityNumber 
          });
          results
          redisClient.setEx(key, 300, JSON.stringify({ id: user.id,
            username: user.userName,
            account:user.accountNumber,
            email: user.emailAddress,
            identity_number: user.identityNumber }));
          return;
        }
      })
    }
    
  };
  exports.account_number = async (req, res) => {
    key = 'accountnumber:'+req.query.code
    let results = null;
    const value = await redisClient.get(key);
    if (value) {
      res.status(200).send(JSON.parse(value));
      console.log("ADa cache")
    } else {
      console.log("Tidak ada cache",value)
      User.findOne({ accountNumber: req.query.code }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
          console.log("data",user)
          res.status(500).send({ 
            id: user.id,
            username: user.userName,
            account:user.accountNumber,
            email: user.emailAddress,
            identity_number: user.identityNumber 
          });
          results
          redisClient.setEx(key, 300, JSON.stringify({ id: user.id,
            username: user.userName,
            account:user.accountNumber,
            email: user.emailAddress,
            identity_number: user.identityNumber }));
          return;
        }
        else{
          res.status(500).send({ message: "Data Not Found" });
        return;
        }
      })
    }
    
  };
  exports.identity_number = async (req, res) => {
    key = 'identitynumber:'+req.query.code
    let results = null;
    const value = await redisClient.get(key);
    if (value) {
      res.status(200).send(JSON.parse(value));
      console.log("ADa cache")
    } else {
      console.log("Tidak ada cache",value)
      User.findOne({ identityNumber: req.query.code }).exec((err, user) => {
        if (err) {
          redisClient.setEx("error:"+req.query.code, 300, JSON.stringify(err));
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
          console.log("data",user)
          res.status(500).send({ 
            id: user.id,
            username: user.userName,
            account:user.accountNumber,
            email: user.emailAddress,
            identity_number: user.identityNumber 
          });
          redisClient.setEx(key, 300, JSON.stringify({ id: user.id,
            username: user.userName,
            account:user.accountNumber,
            email: user.emailAddress,
            identity_number: user.identityNumber }));
          return;
        }
        else{
          res.status(500).send({ message: "Data Not Found" });
        return;
        }
      })
    }
    
  };