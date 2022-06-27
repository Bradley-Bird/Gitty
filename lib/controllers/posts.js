const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  const resp = await Post.getAll();
  const finalData = resp.map((post) => post);
  res.json(finalData);
});
