const { responseJsonHandler } = require("../helper");
const AuthServices = require("../services/auth");

const signup = async (request, response) => {
  const data = await AuthServices.signup(request);
  if (data.code) {
    responseJsonHandler(data, null, response);
  } else {
    responseJsonHandler(null, data, response);
  }
};

const login = async (request, response) => {
  const data = await AuthServices.login(request);
  if (data.code) {
    responseJsonHandler(data, null, response);
  } else {
    responseJsonHandler(null, data, response);
  }
};

module.exports = {
  signup,
  login,
};
