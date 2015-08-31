BaseClass = require "../../common/BaseClass"

class GameController extends BaseClass

	constructor : (app) ->
		super app

	home : (req, res) =>
		data = {}
		res.render "game/view/home", data

	game : (req, res) =>
		data = {}
		res.render "game/view/game", data

	rules : (req, res) =>
		data = {}
		res.render "game/view/rules", data

	login : (req, res) =>
		data = {}
		res.render "game/view/login", data

	create : (req, res) =>
		data = {}
		res.render "game/view/create", data

	build : (req, res) =>
		data = {}
		res.render "game/view/build", data


module.exports = GameController