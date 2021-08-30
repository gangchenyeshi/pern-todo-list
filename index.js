const express = require("express");
const cors =require("cors");
const pool = require("./db");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined

//middleware
app.use(cors());
app.use(express.json());

// app.use(express.static(path.join(__dirname, "client/build"))); 
// OR
// app.use(express.static("./client/build")); 

if(process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")))
}

console.log(__dirname)
console.log(path.join(__dirname, "client/build"))
//ROUTERS

//create a todo
app.post("/todos", async (req, res) => {
    try {
        // console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING * ",
            [description]
        );

        res.status(200).json(newTodo.rows[0])
    } catch (err) {
        console.log(err.message)
    }
});

//get all todo
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.status(200).json(allTodos.rows);
    } catch (err) {
        console.log(err.message)
    }
});

// get a todo by id
app.get("/todos/:id", async (req, res) => {
    try {
        // console.log(req.params);
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );
        res.status(200).json(todo.rows)
    } catch (err) {
        console.log(err.message)
    }
});

//update a todo by id
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodos = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );
        res.status(200).json("Todo was updated!")
    } catch (err) {
        console.log(err.message)
    }
})
//delete a todo
app.delete("/todos/:id", async(req, res)=>{
    try {
        const{id}=req.params;
        const deleteTodos = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.status(200).json("Todo was Deleted!")
    } catch (err) {
        console.log(err.message)
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is started on port no ${PORT}`)
}) 