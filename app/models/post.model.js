module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING
    },
    text: {
      type: Sequelize.STRING
    }
  });

  return Post;
};
