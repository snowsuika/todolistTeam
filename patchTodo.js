const handle = require('./handle');
const Todo = require('./models/todo');

const patchTodo = async (req, res, todos, body) => {
    try {
        // const title = JSON.parse(body).title;
        const contxt = JSON.parse(body);
        const id = req.url.split('/').pop();
        const index = todos.findIndex(el => el._id.toString() === id);
        if (contxt !== undefined && index !== -1) {
         await Todo.findByIdAndUpdate(id,contxt).then((todos)=>{
            handle.successHandler(res, todos, '資料更新成功');
        })  
            
        } else {
            handle.errorHandle(res, '欄位未填寫正確,或查無此 id');
        }
        res.end()
    } catch (err) {
        handle.errorHandle(res, `${err.name} + '-' + ${err.message}`);
    }

}


module.exports = patchTodo;