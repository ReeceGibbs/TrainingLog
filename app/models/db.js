//database connection as a model - interesting (I suppose just like DBContext)
const mysql = require("mysql");
const dbConfig = require("../config/db.config");

//define the connection context
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})

//open the connection
connection.connect(error => {

    if (error) throw error;

    console.log("Successfully connected to the database.");
});

module.exports = connection;