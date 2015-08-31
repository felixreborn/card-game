path = require "path"
http = require "http"
swig = require "swig"
express = require "express"

modloader = require "./modloader"

app = express()
app.set "port", 5000
#setup session handling using SDK defaults
server = http.createServer app
app.set "server", server


#swig setup
app.engine 'swig', swig.renderFile
app.set 'view engine', 'swig'
app.set 'views', __dirname + '/modules'
app.set 'view cache', false
swig.setDefaults { cache : false }

modloader = new(modloader)(__dirname)
modloader.configure app

app.set 'middleware', {}
#CSRF
app.use (err, req, res, next) =>
	#not a CSRF problem? carry on!
	return next(err) if err.code isnt 'EBADCSRFTOKEN'

	#handle CSRF problem..
	res.status 403
	res.render 'csrf_error'

#make items available in views
app.use (req, res, next) ->
	next()

server.listen app.get("port"), (err) =>
	console.log "listening.."