const bcryptjs = require("bcryptjs");
const { errors } = require("../helper");
const AuthModel = require("../models/authModel");

const userDatabase = {
  signup: async (userObj) => {
    return new Promise((resolve, reject) => {
      try {
        // AuthModel.findOne({ 'username': { '$regex': `^${userObj.userName}`, $options: 'i' } }, (error, data) => {
        AuthModel.findOne(
          { user_name: { $regex: userObj.user_name, $options: "i" } },
          (error, data) => {
            if (error) {
              errors["002"].reason = error.message || "";
              reject(errors["002"]);
            } else if (data) {
              errors[
                "001"
              ].reason = `User name ${userObj.user_name} is already exist`;
              reject(errors["001"]);
            } else {
              AuthModel.create(userObj, (error, _) => {
                if (error) {
                  errors["001"].reason = error.message || "";
                  reject(errors["001"]);
                } else {
                  resolve({ message: "Account has been created" });
                }
              });
            }
          }
        );
      } catch (error) {
        errors["003"].reason = error.message;
        reject(errors["003"]);
      }
    });
  },

  login: async (userObj) => {
    return new Promise((resolve, reject) => {
      const { user_name, password } = userObj;
      try {
        AuthModel.findOne({ user_name }, async (error, user) => {
          if (error) {
            errors["002"].reason = error.message || "";
          } else if (user) {
            if (user.status === "approved") {
              AuthModel.findByIdAndUpdate(
                user._id,
                { online: true },
                async (error, _) => {
                  if (error) {
                    errors["005"].reason = error.message || "";
                    reject(errors["005"]);
                  } else {
                    await bcryptjs
                      .compare(password, user.password)
                      .then((response) => {
                        if (response) {
                          resolve(user);
                        } else {
                          errors["008"].reason = "Invalid password";
                          reject(errors["008"]);
                        }
                      })
                      .catch((error) => {
                        errors["009"].reason = error.message || "";
                      });
                  }
                }
              );
            } else if (user.status === "pending") {
              (errors["008"].reason =
                "Your account is currently pending state by the administrator."),
                reject(errors["008"]);
            } else if (user.status === "banned") {
              (errors["008"].reason =
                "This account has been suspended contact administrator."),
                reject(errors["008"]);
            }
          } else {
            reject(errors["008"]);
          }
        });
      } catch (error) {
        errors["003"].reason = error.message;
        reject(errors["003"]);
      }
    });
  },
};

module.exports = userDatabase;
