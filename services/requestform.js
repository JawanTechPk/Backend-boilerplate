const formDatabase = require("../database/form");
const { errors } = require("../helper");

const formServices = {
  addForm: async (req) => {
    try {
      const { department, category, type, description, requester } = req.body;
      if (!department || !category || !type || !description || !requester) {
        return errors["004"];
      }
      return await formDatabase.createForm(req.body);
    } catch (error) {
      if (error.code) {
        return error;
      } else {
        errors["003"].reason = error.message;
        return errors["003"];
      }
    }
  },
  getForm: async (req) => {
    try {
      const { department } = req.query;
      const findQuery = {
        department,
      };
      const formRecord = await formDatabase.getForm(findQuery);
      return formRecord;
    } catch (error) {
      if (error.code) {
        return error;
      } else {
        errors["003"].reason = error.message;
        return errors["003"];
      }
    }
  },
  updateForm: async (req) => {
    try {
      const formId = req.params;
      const body = req.body;
      const formRecord = await formDatabase.updateForm(formId, body);
      return formRecord;
    } catch (error) {
      errors["003"].reason = error.message;
      return errors;
    }
  },
};

module.exports = formServices;
