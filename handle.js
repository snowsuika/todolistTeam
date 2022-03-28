// FIXME: 改引用 library.headers
const errorHandle = (res) => {
    res.writeHead(400, res.headers);
    res.write(JSON.stringify(
        {
            "status": "false",
            // TODO: message 是否改參數傳入，這樣是不是比較靈活。
            "message": "欄位未填寫正確，或無此 todo ID"
        }
    ));
    res.end();
}

// FIXME: 改引用 library.headers
const successHandler = (res, todos) => {
    res.writeHead(200, res.headers);
    res.write(JSON.stringify({
        "status": "success",
        // TODO: message 是否改參數傳入，這樣是不是比較靈活。
        "message": "刪除成功",
        "data": todos
    }));
    res.end();
}

module.exports = { errorHandle, successHandler };