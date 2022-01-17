const { responseJsonHandler } = require("../helper");
const formServices = require("../services/requestForm");

const addForm = async (request, response) => {
  const data = await formServices.addForm(request);
  if (data.code) {
    responseJsonHandler(data, null, response);
  } else {
    responseJsonHandler(null, data, response);
  }
};

const getForm = async (request, response) => {
  const data = await formServices.getForm(request);
  if (data.code) {
    responseJsonHandler(data, null, response);
  } else {
    responseJsonHandler(null, data, response);
  }
};

const updateForm = async (request, response) => {
  const data = await formServices.updateForm(request);
  if (data.code) {
    responseJsonHandler(data, null, response);
  } else {
    responseJsonHandler(null, data, response);
  }
};

module.exports = { addForm, getForm, updateForm };
