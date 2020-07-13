const http = require('http'),
    bodyParser = require('body-parser'),
    express = require('express'),
    routes = require('./server/routes/index');

const port = process.env.PORT || 3000,
    app = express(),
    server = http.createServer(app);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
    next();
});
routes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));
// app.use('/search', routes);
app.get('/api', (req, res) => {
    res.send({
        msg: 'Hello from express'
    })
})
server.listen(port, () => {
    console.log("Listening on port " + port);
});