import React, { Fragment, useState, useEffect } from 'react'
import EditTodo from './EditTodo';

const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    //Delete Function
    async function deleteTodo(id) {
        try {
            await fetch(`/todos/${id}`, {
                method: "DELETE",
            });

            setTodos(todos.filter((todo) => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    //List Function
    async function getTodos() {
        const res = await fetch("/todos");
        const todoArray = await res.json();
        setTodos(todoArray);
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
                                <EditTodo todo={todo} />
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
