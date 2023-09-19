const db = require("../models");
const { Op } = require("sequelize");
const Like = db.likes

exports.create = (req, res) => {
	const postId = req.params.postId
	const userId = req.params.userId
	if (!postId){
		res.status(400).send({
			message: "Post Id required!"
		})
		return
	}

	const like = {
		like: true,
		postId,
		userId
	}

	Like.create(like)
		.then(data => {
			res.send(data)
	})
	.catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while liking the post."
      });
    });
}

exports.delete = (req, res) => {
	const postId = req.params.postId
	const userId = req.params.userId
	if (!postId){
		res.status(400).send({
			message: "Post Id required!"
		})
		return
	}

	Like.update({like: false}, {
		where: { 
			[Op.and]: [{postId}, {userId}]  
		}
	})
	.then(num => {
	  if (num == 1) {
	    res.send({
	      message: "Like was deleted successfully!"
	    });
	  } else {
	    res.send({
	      message: `Cannot delete Like with id=${postId}. Maybe Like was not found!`
	    });
	  }
	})
	.catch(err => {
	  res.status(500).send({
	    message: "Could not delete Like with id=" + postId
	  });
	});
}
