const getTodo = (res, todos) => {
    res.writeHead(200, res.headers)
    res.write(JSON.stringify({
        "status": "success",
        "data": todos
    }));
    res.end();
}

module.exports = getTodo;