const express = require("express");
const app = express();
const cors = require("cors"); //middleware
const pool = require("./db"); //run queries
const env = require("dotenv").config(); //store environmental variables

//connect to supabase
const supabaseURL = process.env.DATABASE_URL;
const supabaseKey = process.env.DATABASE_KEY;
const supabase = require("@supabase/supabase-js").createClient(supabaseURL, supabaseKey);

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create message
app.post("/chatlog", async(req,res) => {
    try{
        const {username, description} = req.body;
        const {data, err} = await supabase.from("chatlog").insert([{username, description}]);
        res.json(data);
        console.log(data);
    }catch(err){
        console.log(err.message);
    }
})

//get all messages
app.get("/chatlog", async(req, res) => {
    try{
        const {data, err} = await supabase.from("chatlog").select();
        if(err) throw err;
        res.json(data);
    }catch(err){
        console.log({err});
        res.status(500).json({ error: "Failed to fetch chat log" });
    }
})

//get a message
app.get("/chatlog/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const {data, err} = await supabase.from("chatlog").select().eq("id", [id]);
        res.json(data[0]);
    }catch(err){
        console.log({err});
    }
});

//edit a message
app.put("/chatlog/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const description = req.body;
        const {data, err} = await supabase.from("chatlog").update({description}).eq("id", [id]);
        res.json("Chatlog was updated");
    }catch(err){
        console.log({err});
    }
});

//delete a message
app.delete("/chatlog/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const {data, err} = await supabase.from("chatlog").delete().eq("id", [id]);
        res.json("Chat was deleted.");
    }catch(err){
        console.log({err});
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server has started on port ${process.env.PORT}.`)
});