// importing our packages
const express = require("express");
const bodyParser = require("body-parser");

//define app as an instance of express
const app = express();

//define our express app
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

//route config
require("./app/routes/logs.routes")(app);

app.listen(80, () => {
    console.log("Training Log Server Running...");
});