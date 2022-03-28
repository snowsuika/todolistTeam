const { headers } = require("./library")

const patchTodo = (req, res, todos, body) => {
    try {
        const title = JSON.parse(body).title;
        const id = req.url.split('/').pop();
        const index = todos.findIndex(el => el.id === id);
        if (title !== undefined && index !== -1) {
            todos[index].title = title
            res.writeHead(200, headers);
            res.write(JSON.stringify({
                "status": "success",
                "data": todos
            }))

        } else {
            res.writeHead(400, headers);
            res.write(JSON.stringify({
                "status": "false",
                "message": "欄位未填寫正確,或查無此Id"
            }))
        }
        res.end()
    } catch (err) {
        res.writeHead(400, headers);
        res.write(JSON.stringify({
            "status": "false",
            "message": err.name + '-' + err.message
        }))
        res.end()
    }

}


module.exports = patchTodo;