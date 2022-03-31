const HTTP_STATUS = {
  OK: {
      code: 200,
      message: "OK."
  },
  BAD_REQUEST: {
      cose: 400,
      message: "data not correct or find not todo!"
  },
  NOT_FOUND: {
      code: 404,
      message: "not found."
  },
  SERVER_ERROR: {
      code: 500,
      message: "Internal Server Error."
  }
}

module.exports = {
    HTTP_STATUS
};
