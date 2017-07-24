const express = require('express')
const app = express()
const PORT = 3010;

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(PORT, function () {
    console.log('Example app listening on port 3010!')
})