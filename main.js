var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')

app.get('/', function(req, res) {
    const tracks = fs.readdirSync(path.join(__dirname, 'tracks')).map(file => {
        return `
    <div class="track">
        <div>
            <p>${file}</p>
        </div>
        <div>
            <audio controls>
                <source src="/${file}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        </div>
    </div>`
    })
    res.send(`
        <html>
            <head>
                <title>Music Player</title>
            </head>
            <body>
                <h1>Music Player</h1>
                <h2>Put files on the tracks directory to see them here</h2>
                ${tracks}
            </body>
        </html>
    `)
})

app.get('/:track', function(req, res) {
    res.sendFile(path.join(__dirname, 'tracks', req.params.track))
})

app.listen(9090)