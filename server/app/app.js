const express = require('express')
const mountRoutes = require('./routes')
const {pool} = require("./db");
const cors = require('cors')

const app = express()

app.use(express.urlencoded())
app.use(express.json());
app.use(cors({credentials: true, origin: true}))

mountRoutes(app)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Sever is now listening at port ${port}`);
})

pool.connect();