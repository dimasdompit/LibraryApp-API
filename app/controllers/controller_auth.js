const modelAuth = require("../models/model_auth");
const helper = require("../helpers/myResponse");
const bcrypt = require("bcrypt");
const joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("../../src/config/global");
let tokenList = {};

const registerSchema = joi.object({
  username: joi.string().alphanum().min(4).max(30).required(),
  password: joi.string().min(6).max(30).required(),
  roles_id: joi.number().integer().required(),
});

module.exports = {
  register: async function (request, response) {
    const setData = request.body;
    const data = await modelAuth.loginModel(setData.username);
    const existData = {
      ...data[0],
    };
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(setData.password, salt);
    try {
      if (setData.username == existData.username) {
        return helper.response(
          response,
          "fail",
          "username is already taken!",
          401
        );
      } else {
        await registerSchema.validateAsync(setData);
        setData.password = hash;
        const result = await modelAuth.registerModel(setData);
        delete result.password;
        const newData = {
          status: "Registered Successfully!",
          ...result,
        };
        return helper.response(response, "success", newData, 201);
      }
    } catch (err) {
      console.log(err.message);
      const errorMessage = err.message;
      if (err.message) {
        return helper.response(response, "fail", errorMessage, 401);
      } else {
        return helper.response(response, "fail", "Internal Server Error", 500);
      }
    }
  },
  login: async function (request, response) {
    const loginData = request.body;
    try {
      const result = await modelAuth.loginModel(loginData.username);
      if (result.length > 0) {
        const hashPass = result[0].password;
        const checkPass = bcrypt.compareSync(loginData.password, hashPass);
        if (checkPass) {
          delete result[0].password;
          const tokenData = {
            ...result[0],
          };
          const token = jwt.sign(tokenData, config.jwtSecretKey, {
            expiresIn: config.tokenLife,
          });
          const refreshToken = jwt.sign(tokenData, config.jwtRefreshKey);
          result[0].token = token;
          result[0].refreshToken = refreshToken;
          const newData = {
            status: "Login Success!",
            ...result[0],
          };
          tokenList[refreshToken] = newData.username;
          return helper.response(response, "success", newData, 200);
        }
        return helper.response(
          response,
          "fail",
          "Incorrect Username or Password!",
          400
        );
      }
      return helper.response(
        response,
        "fail",
        "Incorrect Username or Password!",
        400
      );
    } catch (err) {
      console.log(err);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },

  generateRefreshToken: async function (request, response) {
    const setData = request.body;
    const refreshToken =
      request.body.refreshToken || request.headers["refresh-token"];
    try {
      if (refreshToken && refreshToken in tokenList) {
        const decoded = request.decodeRefreshToken;
        const token = jwt.sign(decoded, config.jwtSecretKey, {
          expiresIn: config.tokenLife,
        });
        const newRefreshToken = jwt.sign(decoded, config.jwtRefreshKey, {
          expiresIn: config.refreshToken,
        });
        const newResponse = {
          status: "Refresh Token Success",
          data: {
            token: token,
            refreshToken: newRefreshToken,
          },
        };
        tokenList[setData.refreshToken] = token;
        return helper.response(response, "success", newResponse, 200);
      } else {
        return helper.response(response, "fail", "Invalid Request", 403);
      }
    } catch (error) {
      console.log(error);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },
};
