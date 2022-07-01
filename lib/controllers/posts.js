const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const post = await Post.insert(req.body);
      res.json(post);
    } catch (e) {
      next(e);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      console.log('reqcontroller', req.body);
      const resp = await Post.getAll();
      console.log('resp18', resp);
      res.json(resp);
    } catch (e) {
      next(e);
    }
  });
