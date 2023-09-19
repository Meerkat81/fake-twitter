const db = require("../models");
const User = db.users;
const Post = db.posts;

//Create a Post
exports.create = (req, res) => {
	const userId = req.params.id
	//Validate request
	if (!userId){
		res.status(400).send({
			message: "User Id required!"
		})
		return
	}

	if (!req.body.text){
		res.status(400).send({
			message: "text can not be empty!"
		})
		return
	}

	if (!req.body.title){
		res.status(400).send({
			message: "title can not be empty!"
		})
		return
	}

	const post = {
		title: req.body.title,
		text: req.body.text,
		userId
	}

	Post.create(post)
		.then(data => {
			res.send(data)
	})
	.catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    });
}
//Delete a Post
exports.delete = (req, res) =>{
	const id = req.params.id;

	Post.destroy({
		where: { id: id }
	})
	.then(num => {
	  if (num == 1) {
	    res.send({
	      message: "Post was deleted successfully!"
	    });
	  } else {
	    res.send({
	      message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
	    });
	  }
	})
	.catch(err => {
	  res.status(500).send({
	    message: "Could not delete Post with id=" + id
	  });
	});
}

//Get a Post
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Post with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id
      });
    });
};

//Get Recent Post
exports.findRecent = (req, res) => {
  const userId = req.params.id;

  Post.findAll({
  	where: {userId},
  	order: [['createdAt', 'DESC']],
  	limit: 5})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Post with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id
      });
    });
};

//Get all Posts
exports.allUserPost = (req, res) => {
  const userId = req.params.id;

  Post.findAll({
  	where: {userId},
  	})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Post with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id
      });
    });
};
