// Api to store notes
const Joi = require("joi"),
    express = require("express"),
    app = express(),
    path = require("path");
    port = 3000;
    fs = require('fs');

app.use(express.json());

let todos = [
    {id: 1, todo: "example"}
]

app.get("/api/todos", (req, res) =>{
    return res.send(todos);
}); 
app.get("/api/todos/:id", (req, res) =>{
    let todo = todos.find(c => c.id == parseInt(req.params.id));
    if(!todo){
        return res.status(404).send("The id you are searching for doesn't exist.");
    } 
    res.send(todo);
});
app.post("/api/todos", (req, res) =>{
    if(!req.body.todo) return res.status(400).send("todo?");
    let thing = {
        id: todos.length + 1,
        todo: req.body.todo
    };
    todos.push(thing);
    writeToFile(thing);
    res.send(todos);
});

function validateThing(todo){
    const schema = {
        todo: Joi.string().min(3).required()
    };
    return Joi.validate(thing, schema);
}
function writeToFile(thing){
    fs.appendFile('./src/txt/log.txt', "\n" + JSON.stringify(thing), (err) =>{
        if(err){
            console.log("ERROR");
        }
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`))