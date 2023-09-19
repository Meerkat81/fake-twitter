const posts = require("../controllers/post.controller.js");
var router = require("express").Router();

module.exports = function(app){
	app.use(function(req, res, next) {
   	 res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    	next();
  	});

	router.post("/user/:id", posts.create)
	router.delete("/:id", posts.delete)
	router.get("/:id", posts.findOne)
	router.get("/user/:id/recent", posts.findRecent)
	router.get("/user/:id/", posts.allUserPost)
	app.use('/api/posts', router);
}
