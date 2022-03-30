const library = require('./library');
const HTTP_STATUS = require('./constants')

// FIXME: 改引用 library.headers
const errorHandle = (res) => {
    res.writeHead(HTTP_STATUS.BAD_REQUEST.cose, library.headers);
    res.write(JSON.stringify(
        {
            "status": "false",
            // TODO: message 是否改參數傳入，這樣是不是比較靈活。
            "message": HTTP_STATUS.BAD_REQUEST.message
        }
    ));
    res.end();
}

// FIXME: 改引用 library.headers
const successHandler = (res, todos) => {
    res.writeHead(HTTP_STATUS.OK.code, library.headers);
    res.write(JSON.stringify({
        "status": "success",
        // TODO: message 是否改參數傳入，這樣是不是比較靈活。
        "message": HTTP_STATUS.OK.message,
        "data": todos
    }));
    res.end();
}

module.exports = { errorHandle, successHandler };