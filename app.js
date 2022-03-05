const express = require('express')
const app = express()
const port = 3000
const pool = require("./db");

const path=require('path')
var bodyParser = require('body-parser')
const { Pool } = require('pg')

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/todos',jsonParser,async (req, res) => {
  console.log(req.body);
  const {description }=req.body;
  const newTodo = await pool.query(
    "INSERT INTO todo (description) VALUES($1)",
    [description]
  );
 res.json(newTodo);
   })    

   app.get('/todos',jsonParser,async (req, res) => {
     console.log("triggered get all api");
     try {
       const allTodos = await pool.query("SELECT * FROM todo");
       res.json(allTodos.rows)
       
     } catch (error) {
       console.log(error.message);
       
     }
     }) 

     app.get('/todos/:id',jsonParser,async (req, res) => {
      console.log("triggered get specific api");
      try {
        const id_to_delete=req.params.id;
        const todo = await pool.query(
          "SELECT * FROM todo WHERE todo_id = $1",[id_to_delete]
        )
        console.log(id_to_delete);
        res.json(todo.rows[0]);
      } catch (error) {
        console.log(error.message);
      }
      }) 

      app.put('/todos/:id',jsonParser,async (req, res) => {
        console.log("triggered get all api");
        try {
          const {id}= req.params;
          const {description}=req.body;
          const updateTodo = await pool.query(
            "UPDATE todo SET description =$1 WHERE todo_id = $2",
            [description,id]
          );

          res.json("todo was updated")
        } catch (error) {
          console.log(error.message);
        }
        }) 

        app.delete("/todos/:id", jsonParser,async (req,res)=>{
          console.log("triggered deletion api for specific todo");
            try {
              const id_to_delete = req.params.id;
              const deleteTodo = await pool.query(
                "DELETE FROM todo WHERE todo_id = $1",[id_to_delete]
              );
              res.json("the required todo was deleted");
            } catch (error) {
              console.log(error.message);
            }
        });
        

          
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})