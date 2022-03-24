const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
}

const successHandler = (res, todos) => {
    res.writeHead(200, headers);
    res.write(JSON.stringify({
        "status": "success",
        "message": "刪除成功",
        "data": todos
    }));
    res.end();
}

const errorHandler = res => {
    res.writeHead(400, headers);
    res.write(JSON.stringify({
        "status": "false",
        "message": "欄位未填寫正確，或無此id"
    }));
    res.end();
}

/** 
 * @param {*} type  [ 刪除全部:all | 刪除單筆:single ]
 */ 
const deleteTodo = (type, res, todos) => {
    switch (type) {
        case 'all':
            todos.length = 0;
            successHandler(res, todos);
            break;
        case 'single':
            const id = url.split('/').pop();
            const index = todos.findIndex(item => item.id === id);
            if (index !== -1) {
                todos.splice(index, 1);
                successHandler(res, todos);
            } else {
                errorHandler(res);
            }
            break;
        default:
            break;
    }
}

module.exports = deleteTodo;