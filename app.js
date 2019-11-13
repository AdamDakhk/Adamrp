const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true })); 

const port = 8080;

let users = [];

function SaveObject(file,o){
	let str = JSON.stringify(o);
	fs.writeFileSync(file, str);
}

function LoadObject(file){
	let str = fs.readFileSync(file);
	return JSON.parse(str);
}
users = LoadObject('users.json');


app.get('/', function (req, res) {
	res.send(`
			<script>
			function login(){
				let usr=document.getElementById("login").value;
				let pswd=document.getElementById("pwd").value;
				alert('Hello ' + usr + "! Your password is: " + pswd);
				if(usr=='student' && pswd=="123") {
					alert("Hooray!");
					window.location='/secret';
				} else
					alert("Error: login or password is uncorrect! Try this step again!");
			}
			</script>
			ADAM RABOTAI!!!!!!!
			<br>
			Login:
			<input type="text" id="login">
			<br>
			Password:
			<input type="password" id="pwd">
			<br>
			<button onclick="login()">Login</button>
			<br>
			`);
});
app.get('/secret',
			function(reg, res) {
				res.send(`Very secret page`)
			}
			);

// Для получения переменных из HTML формы
// let login = req.body.login,

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
