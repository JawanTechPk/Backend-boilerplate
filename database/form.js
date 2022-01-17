const mongoose = require("mongoose");
const { errors } = require("../helper");
const formModel = require("../models/formModel");

const formDatabase = {
  createForm: async (formObj) => {
    return new Promise((resolve, reject) => {
      try {
        formModel.create(formObj, (err, _) => {
          if (err) {
            errors["001"].reason = err.message || "";
            reject(errors["001"]);
          } else {
            resolve({
              message: "form request successfully submit",
            });
          }
        });
      } catch (error) {
        errors["003"].reason = error.message;
        reject(errors["003"]);
      }
    });
  },

  getForm: (findQuery) => {
    return new Promise((resolve, reject) => {
      try {
        formModel
          .find(findQuery)
          .populate("requester", "user_name , office_number")
          .exec((err, data) => {
            if (err) {
              errors["002"].reason = err.message = "";
              reject(errors["002"]);
            } else {
              resolve(data);
            }
          });
      } catch (error) {
        errors["003"].reason = error.message;
        reject(errors["003"]);
      }
    });
  },

  updateForm: async (formId, body) => {
    return new Promise( async (resolve, reject) => {
      const session = await mongoose.startSession();
      try {
        session.startTransaction();
        formModel.findByIdAndUpdate(
          formId.id,
          body,
          { session },
          async (err, _) => {
            if (err) {
              await session.abortTransaction();
              session.endSession();
              errors["005"].reason = err.message || "";
              reject(errors["005"]);
            } else {
              await session.commitTransaction();
              session.endSession();
              resolve({ message: "successfully update form" });
            }
          }
        );
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        errors["003"].reason = error.message;
        reject(errors["003"]);
      }
    });
  },
};

module.exports = formDatabase;
