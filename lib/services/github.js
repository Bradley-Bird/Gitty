const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const resp = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  });
  const respBody = await resp.json();
  console.log('respBody', respBody);
  return respBody.access_token;
};

const getGithubProfile = async (token) => {
  console.log('token!', token);
  const resp = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  const profile = await resp.json();
  console.log('profile', profile);
  return profile;
};

module.exports = { exchangeCodeForToken, getGithubProfile };
