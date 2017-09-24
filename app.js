var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname, 'build/es5-bundled')))

const server = app.listen(3000, process.env.LETSSNAP_INTERNAL_IP, function() {
    const host = server.address().address
    const port = server.address().port
    console.log('LetsSnap listening at https://%s:%s', host, port)
})