const handle = require('./handle');
const Todo = require('./models/todo');

const postTodo = async (res, body) => {
    try {
        const { title, completed } = JSON.parse(body);
        const newTodo = await Todo.create({
            title,
            completed,
        });
        handle.successHandler(res, newTodo, '資料新增成功');
    } catch (err) {
        const errorField = Object.keys(err.errors).join('、');
        handle.errorHandle(res, `${errorField} 欄位有誤，請重新確認`);
    }
};

module.exports = postTodo;
