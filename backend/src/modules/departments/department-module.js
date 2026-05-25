const axios = require("axios");
const { API_URL, API_HEADERS } = require("../../constants/index");
const errorHandler = require("../../utils/apiErrorHandler");

let initialized = false;

const initializeHandler = async () => {
  if (initialized) return;
  initialized = true;
  try {
    const response = await axios.get(API_URL, {
      headers: API_HEADERS,
    });
    try {
      json.data = response.data
    }
    catch(e) {
      errorHandler(response.data.message);
    }
  } catch (error) {
    errorHandler(response.message);
  }
};

// Call the initialization
initializeHandler();

// Export a higher-order function that wraps the module exports
const departmentModuleHandler = (moduleFactory) => {
  if (!initialized) {
    initializeHandler();
  }
  return moduleFactory();
};

module.exports = { departmentModuleHandler };

