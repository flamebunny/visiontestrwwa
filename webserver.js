var express = require('express'),
    path = require('path'),
    sass = require('node-sass'),
    args = require('yargs').argv,
    args = require('yargs').argv,
    Hammer1 = require('libs/hammer/hammer'),
    Hls1 = require('libs/hls/hls')


var app = express()


app.get('/api/GeoFence/Index', function(req, res) {
    res.send('{ "foo": "bar" }')
})

app.get('/api/config/lbsparameters', function(req, res) {
    res.send('{ "foo": "bar" }')
})

app.get('/logon/isAuthenticated', function(req, res) {
    res.send('{ "foo": "bar" }')
})

app.get('/api/Feature/index', function(req, res) {
    res.send('[]')
})

app.get('/account/getaccountdetailsformenu', function(req, res) {
    res.send('{ "foo": "bar" }')
})

app.get('/sass*', function(req, res) {
    var filename = path.basename(req.params[0])

    sass.render({
        file: './sass/' + filename,
        outputStyle: 'expanded'
    }, function(err, result) {
        if (err) {
            console.error(err.message)
            res.send(err.message)
            return
        }

        res.set({
            'Content-Type': 'text/css'
        })

        res.send(result.css.toString())
    })
})


app.use(express.static('./'))

 
var port = (args.port ? args.port : 3000)

app.listen(process.env.PORT || 3000, function() {
    console.log(`\n\tNow listening at http://localhost:${port}\n\n\tPress ctrl+c to stop`)
})
