const router = require('express').Router();
const { Post } = require('../models');
// TODO: Go to '../utils/auth' and complete middleware function
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // TODO: 1. Find all Posts for a logged in user (use the req.session.userId)
    // TODO: 2. Serialize data (use .get() method, or use raw: true, nest: true in query options)
    // TODO: 3. Render the 'all-posts-admin' template in the 'dashboard' layout with the posts data
const postData = await Post.findAll({
  where: {
    userId: req.session.userId,
  },
});

const posts = postData.map((post) => post.get ({ plain: true}));
console.log(postData);

res.render("all-posts-admin", {
  layout: "dashboard",
  posts,
});

  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // TODO: 1. Find a Post by primary key
    // TODO: 2. Serialize data (use .get() method, or use raw: true, nest: true in query options)
    // TODO: 3. Render the 'edit-post' template in the 'dashboard' layout with the post data
const postData = await Post.findByPk(req.params.id);
console.log('postData', postData)

if (postData) {
  const post =postData.get ({ plain: true });
  console.log('post', post);
  res.render("edit-post", {
    layout: "dashboard",
    post,
  });
} else {
  console.log ('else')
  res.status(404).end();
}

  } catch (err) {
    console.log('catch err')
    console.log(err);
  
    res.redirect('login');
  }
});

module.exports = router;
