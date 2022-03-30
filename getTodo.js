const getTodo = (res, todos) => {
    // TODO: 這裡應該改成用 Handle.successHandler
    res.writeHead(200, res.headers)
    res.write(JSON.stringify({
        "status": "success",
        "data": todos
    }));
    res.end();
}

module.exports = getTodo;