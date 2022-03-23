const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
}

const patchTodo = (req,res,todos) =>{
    let body = "";

    req.on('data',chuck=>{
        body += chuck;
    })

    req.on('end',()=>{
        try{
            const title = JSON.parse(body).title;
            const id = req.url.split('/').pop();
            const index = todos.findIndex(el => el.id === id);
            if(title !== undefined && index !== -1){
                todos[index].title = title
                res.writeHead(200,headers);
                res.write(JSON.stringify({
                    "status":"success",
                    "data":todos
                }))

            }else{
                res.writeHead(400,headers);
                res.write(JSON.stringify({
                    "status":"false",
                    "message":"欄位未填寫正確,或查無此Id"
                }))
            }
            res.end()
        }catch(err){
            res.writeHead(200,headers);
            res.write(JSON.stringify({
                "status":"false",
                "message":err.name +'-'+err.message
            }))
            res.end()
        }
    })
}


module.exports = patchTodo;