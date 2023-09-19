module.exports = app => {
	const comments = require("../controllers/comment.controller.js");
	var router = require("express").Router();

	router.post("/post/:id", comments.create)
	router.delete("/:id", comments.delete)
	router.get("/post/:id", comments.allPostComments)
	app.use('/api/comments', router);
}
