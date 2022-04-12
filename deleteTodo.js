const handle = require('./handle');
const Todo = require('./models/todo');

/** 刪除全部 todos */
const deleteAllTodos = async (res) => {
    const deleteAll = await Todo.deleteMany({});
    handle.successHandler(res, deleteAll, '資料刪除成功');
}

/** 刪除單筆 todo */
const deleteSingleTodo =  (req, res) => {
    const id = req.url.split('/').pop();
    Todo.findByIdAndDelete(id, async (error, doc)=>{
        if(error || doc === null) { //不存在id和格式不符時進來
            handle.errorHandle(res, '資料刪除失敗，找不到 id');
        } else {
            const todos = await Todo.find();
            handle.successHandler(res, todos, '資料刪除成功');               
        }
    })

}

module.exports = {
    deleteAllTodos,
    deleteSingleTodo
};