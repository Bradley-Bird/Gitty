const { Router } = require('express');
// const jwt = require('jsonwebtoken');
const {
  exchangeCodeForToken,
  getGithubProfile,
} = require('../services/github');

// const ONE_DAT_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res) => {
    const { code } = req.query;
    console.log(code);

    const githubToken = await exchangeCodeForToken(code);
    console.log('token', githubToken);

    const githubProfile = await getGithubProfile(githubToken);
    console.log('githubProfile', githubProfile);
    res.json(githubProfile);
  });
