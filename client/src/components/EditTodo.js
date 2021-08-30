import React, { Fragment, useState } from 'react'

const EditTodo = ({ todo }) => {
    // console.log("todos props :", todo)
    const [description, setDescription] = useState(todo.description);

    //edit description function
    const updateDescription = async(e)=>{
        e.preventDefault();
        try {
            const body = { description };
            const respond = await fetch(`/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(body)
            })
            console.log(respond);
            window.location="/"
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <Fragment>
            {/* Button to Open the Modal */}    
            <button 
                type="button" 
                className="btn btn-secondary" 
                data-toggle="modal" 
                data-target={`#id${todo.todo_id}`}>
                Edit
            </button>

            {/* <!-- The Modal --> */}
            <div className="modal" id={`id${todo.todo_id}`}
                 onClick={()=> setDescription(todo.description)}
                >
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/* <!-- Modal Header --> */}
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todos</h4>
                            <button 
                                type="button" 
                                className="close" 
                                data-dismiss="modal"
                                onClick={()=> setDescription(todo.description)}
                                //when i click the close button it will not store 
                                //the history and back to original description
                            >
                                &times;
                            </button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div className="modal-body">
                            <input 
                                type="text" 
                                className="form-control" 
                                value={description} 
                                onChange={e => setDescription(e.target.value)}    
                            />
                        </div>

                        {/* Modal footer  */}
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-warning" 
                                data-dismiss="modal"
                                onClick={e => updateDescription(e)}
                            >
                                Edit
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                data-dismiss="modal"
                                onClick={()=> setDescription(todo.description)}
                            >Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo
// https://www.w3schools.com/bootstrap4/bootstrap_modal.asp

//click the link above and copy paste this model