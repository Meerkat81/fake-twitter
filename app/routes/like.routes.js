module.exports = app => {
	const likes = require("../controllers/like.controller.js");
	var router = require("express").Router();
	
	router.post("/post/:postId/user/:userId", likes.create)
	router.delete("/post/:postId/user/:userId", likes.delete)
	app.use('/api/likes', router);
}
