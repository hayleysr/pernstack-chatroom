const express = require("express");
const app = express();
const cors = require("cors"); //middleware
const pool = require("./db"); //run queries

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create message
app.post("/chatlog", async(req,res) => {
    try{
        const {description} = req.body;
        const newMsg = await pool.query("INSERT INTO chatlog (description) VALUES($1) RETURNING *", [description]);
        res.json(newMsg.rows[0]);
    }catch(err){
        console.log(err.message);
    }
})

//get all messages
app.get("/chatlog", async(req, res) => {
    try{
        const allMsg = await pool.query("SELECT * FROM chatlog");
        res.json(allMsg.rows);
    }catch(err){
        console.log(err.message);
    }
})

//get a message
app.get("/chatlog/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const thisMsg = await pool.query("SELECT * FROM chatlog WHERE msg_id = $1", [id]);
        res.json(thisMsg.rows[0]);
    }catch(err){
        console.log(err.message);
    }
});

//edit a message
app.put("/chatlog/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const {description} = req.body;
        const editMsg = await pool.query("UPDATE chatlog SET description = $1 WHERE msg_id = $2", [description, id]);
        res.json("Chatlog was updated");
    }catch(err){
        console.log(err.message);
    }
});

//delete a message
app.delete("/chatlog/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const deleteMsg = await pool.query("DELETE FROM chatlog WHERE msg_id = $1", [id]);
        res.json("Chat was deleted.");
    }catch(err){
        console.log(err.message);
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000.")
});