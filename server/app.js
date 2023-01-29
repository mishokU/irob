const express = require('express')
const config = require('config')
const mountRoutes = require('./routes')
const {pool} = require("./db");
const cors = require('cors')

const app = express()
app.use(express.urlencoded())
app.use(express.json());
app.use(cors({credentials: true, origin: true}))

mountRoutes(app)

app.listen(config.get('port'), () => {
    console.log("Sever is now listening at port 5000");
})

pool.connect();