import React, { Fragment, useState, useEffect } from 'react'
import EditTodo from './EditTodo';

const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    //Delete Function
    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`/todos/${id}`, {
                method: "DELETE"
            });
            console.log("Todo is Deleted :", deleteTodo);
            setTodos(todos.filter(todo => todo.todo_id !== id)); 
            //it will filter all the todos and if todo_id not equal to id then spit it out like refresh
        } catch (err) {
            console.log(err.message)
        }
    };

    //List Function
    const getTodos = async () => {
        try {
            const respond = await fetch("/todos")
            const jsonData = await respond.json();

            // console.log("Get the Data :", jsonData);
            setTodos(jsonData)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        getTodos()
    }, []);

    console.log("Todo list :", todos)
    return (
        <Fragment>
            {" "}
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <th>
                                <EditTodo todo={todo}/> 
                                {/* add todo as props */}
                            </th>
                            <th>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >
                                    Delete
                                </button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodo
