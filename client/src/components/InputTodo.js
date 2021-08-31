import React, { Fragment, useState } from 'react'

const InputTodo = () => {
    const [description, setDescription] = useState();

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = { description };
            const respond = await fetch("/todos", {
                method: "POST", //Method use for
                headers: { "Content-Type": "application/json" }, //sending as  json data
                body: JSON.stringify(body) //convert to string from JSON and send it to
            });
            console.log("Respond Data :",respond);
            window.location="/"
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">PERN Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    placeholder="Add todo..."
                    className="form-control"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo
