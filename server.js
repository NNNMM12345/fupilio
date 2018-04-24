let express = require("express");
let app = express();

// Set port
let port = process.env.PORT || 80;

app.use(express.static(__dirname));

// Routes

app.get("/", (req, res) =>{
	res.render("index");
});

app.listen(port, () =>{
	console.log(`Listening on port ${port}`)
});