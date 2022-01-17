const bcryptjs = require("bcryptjs");
const userDatabase = require("../database/user");
const { errors } = require("../helper");

const AuthServices = {
  signup: async (req) => {
    try {
      const {
        user_name,
        wing,
        designation,
        office_number,
        icom_Number,
        password,
      } = req.body;
      if (
        !user_name ||
        !wing ||
        !designation ||
        !office_number ||
        !icom_Number ||
        !password
      ) {
        return errors["004"];
      }
      const hashPassword = await bcryptjs.hash(password, 10);
      const userObj = {
        ...req.body,
        password: hashPassword,
      };
      const signupRecord = await userDatabase.signup(userObj);
      return signupRecord;
    } catch (error) {
      if (error.code) {
        return error;
      } else {
        errors["003"].reason = error.message;
        return errors["003"];
      }
    }
  },

  login: async (req) => {
    try {
      const { user_name, password } = req.body;
      if (!user_name || !password) {
        return errors["004"];
      }
      const userRecord = await userDatabase.login(req.body);
      return userRecord;
    } catch (error) {
      if (error.code) {
        return error;
      } else {
        errors["003"].reason = error.message;
        return errors["003"];
      }
    }
  },
};

module.exports = AuthServices;
