const db = require("../models");

const Comment = db.comments

//create comment
exports.create = (req, res) => {
	const postId = req.params.id
	if (!postId){
		res.status(400).send({
			message: "Post Id required!"
		})
		return
	}

	if (!req.body.text){
		res.status(400).send({
			message: "text can not be empty!"
		})
		return
	}

	const comment = {
		text: req.body.text,
		postId
	}

	Comment.create(comment)
		.then(data => {
			res.send(data)
	})
	.catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment."
      });
    });
}
//delete comment
exports.delete =(req, res) => {
	const id = req.params.id;

	Comment.destroy({
		where: { id: id }
	})
	.then(num => {
	  if (num == 1) {
	    res.send({
	      message: "Comment was deleted successfully!"
	    });
	  } else {
	    res.send({
	      message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
	    });
	  }
	})
	.catch(err => {
	  res.status(500).send({
	    message: "Could not delete Comment with id=" + id
	  });
	});
}
//get all comments for post
exports.allPostComments = (req, res) => {
  const postId = req.params.id;

  Comment.findAll({
  	where: {postId},
  	})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Comments for Post with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Comments for Post with id=" + id
      });
    });
};
