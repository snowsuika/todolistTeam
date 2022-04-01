const library = require('./library');
const HTTP_STATUS = require('./constants')

const errorHandle = (res, message) => {
    res.writeHead(HTTP_STATUS.BAD_REQUEST.cose, library.headers);
    res.write(JSON.stringify(
        {
            "status": "false",
            "message": message
        }
    ));
    res.end();
}

const successHandler = (res, todos, message) => {
    res.writeHead(HTTP_STATUS.OK.code, library.headers);
    res.write(JSON.stringify({
        "status": "success",
        "message": message,
        "data": todos
    }));
    res.end();
}

module.exports = { errorHandle, successHandler };