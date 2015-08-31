configure = (app) =>
	gameController = app.get("controllers").GameController
	app.get "/", gameController.home

exports.configure = configure
