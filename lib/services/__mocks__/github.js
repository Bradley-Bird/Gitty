/* eslint-disable no-console */
const exchangeCodeForToken = async (code) => {
  console.log('Mock-code', code);
  console.log(`MOCK INVOKED: exchangeCodeForToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getGithubProfile = async (token) => {
  console.log(`MOCK INVOKED: getGithubProfile(${token})`);
  return {
    login: 'notreal',
    email: 'null',
    avatar_url: 'null',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
