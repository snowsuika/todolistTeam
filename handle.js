const errorHandle = (res) => {
    res.writeHead(400, res.headers);
    res.write(JSON.stringify(
        {
            "status": "false",
            "message": "欄位未填寫正確，或無此 todo ID"
        }
    ));
    res.end();
}

const successHandler = (res, todos) => {
    res.writeHead(200, res.headers);
    res.write(JSON.stringify({
        "status": "success",
        "message": "刪除成功",
        "data": todos
    }));
    res.end();
}

module.exports = { errorHandle, successHandler };