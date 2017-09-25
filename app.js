var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname, 'build/es5-bundled')))

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'build/es5-bundled') + '/index.html')
})

const server = app.listen(3000, process.env.LETSSNAP_INTERNAL_IP, function() {
    const host = server.address().address
    const port = server.address().port
    console.log('LetsSnap listening at https://%s:%s', host, port)
})