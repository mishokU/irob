const express = require('express')
const config = require('config')
const mountRoutes = require('./routes')
const {pool} = require("./db");

const app = express()
app.use(express.urlencoded())
app.use(express.json());

mountRoutes(app)

app.listen(config.get('port'), ()=>{
    console.log("Sever is now listening at port 5000");
})

pool.connect();