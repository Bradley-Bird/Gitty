const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const post = await Post.insert(req.body);
      console.log('req', req);
      res.json(post);
    } catch (e) {
      next(e);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const resp = await Post.getAll();
      const finalData = resp.map((post) => post);
      res.json(finalData);
    } catch (e) {
      next(e);
    }
  });
//SECRETS
