let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let port = 8000;
let path = require("path");
let app = express();
let server = app.listen(port, () => {
    console.log(`Running on port ${port} .....`);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
var io = require('socket.io').listen(server);
app.get('/', function (req, res) {
    res.render("home");
});
app.use(session({
    secret: "phoenix",
    resave: false,
    saveUninitialized: true
}))

io.sockets.on('connection', (socket) => {
    console.log('socket connection');
    console.log('socket id:', socket.id);
    socket.on('posting_form', (data) => {
        var randNumb = Math.floor((Math.random() * 1000) + 1);
        socket.emit("updatedServer", { response: data });
        socket.emit("randNumb", { response: randNumb });
    });
});




