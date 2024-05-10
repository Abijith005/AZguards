import express from "express"
import { addTodo, deleteTodo, downloadTodoList, filterTodos, getAllTodos, getOneTodo, updateTodo, uploadTodoItems, } from "../controllers/taskController"
import uploadCSV from "../helpers/uploadCSV"
const router=express.Router()

router.route('/todos').post(addTodo).get(getAllTodos)

router.route('/todos/:id').get(getOneTodo).put(updateTodo).delete(deleteTodo)

router.post('/uploadTodos',uploadCSV(),uploadTodoItems)

router.get('/downloadTodos',downloadTodoList)

router.get('/filter',filterTodos)



export default router
 