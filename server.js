var express = require("express");
var app = express();
var nodemailer = require("nodemailer");
var url = require('url');
var contactaddr = process.env.CONTACTADDR || "public/contact.html"
var blogaddr = process.env.BLOGADDR || "public/blog.html"

// Set port
var port = process.env.PORT || 1234;

app.use(express.static(__dirname + "/public"));
// Routes

app.get("/", (req, res) =>{
	res.render("index");
});
app.get("/blog", (req, res) =>{
	res.sendfile(blogaddr)
});
app.get("/contact", (req, res) =>{
	res.sendfile(contactaddr);
});
app.get("/message*/", (req, res) =>{
	if (!(url.parse(req.url, true).query.name)){
	res.send("You did not give me your name!")
	}
	if (!(url.parse(req.url, true).query.email)){
		res.send("You did not give me your email! or it was not proper.")
	}
	if (!(url.parse(req.url, true).query.message)){
		res.send("You did not give me your message!")
	}

	name = url.parse(req.url, true).query.name
	email = url.parse(req.url, true).query.email
	message = url.parse(req.url, true).query.message
	try{
		let transporter = nodemailer.createTransport({
			service: "gmail",
			secure: false,
			port: 25,
			auth: {
				user: 'legendaryemailbot@gmail.com',
				pass: 'J48eJVD4p0MbKiyehtrAs9vH28AK0'
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		let HelperOptions = {
			from: '"Fupilio" < legendaryemailbot@gmail.com',
			to: 'user3610@protonmail.com',
			subject: `Customer ${name} contacted you"`,
			text: `User ${name} contacted you with the email ${email} His message is ${message}`
		};
		transporter.sendMail(HelperOptions, (error, info) => {
			if(error){
				return console.log("this is the error" + error)
			}
		});
	}catch(err){
		res.send("Error happened while sending the email...")
	}


	res.send(`<center>${name} Your message "${message}" was sent successfully<br><a href="/"><button>Home</button></a></center>`)
});
app.get("/*", (req, res) =>{
	res.send("<br><br><center><h1>Hello there, it looks like you are lost.<h1><br><strong>ERROR 404</strong></center>");
});
app.listen(port, () =>{
	console.log(`Listening on port ${port}`)
});
