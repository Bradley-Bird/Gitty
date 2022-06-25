const pool = require('../utils/pool');

module.exports = class GithubUser {
  id;
  username;
  email;
  avatar;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
    this.avatar = row.avatar;
  }

  static async insert({ username, email, avatar }) {
    if (!username) throw new Error('A username is required');
    const { rows } = await pool.query(
      `
      INSERT INTO github_users (username, email, avatar)
      VALUES ($1, $2, $3)
      RETURNING * `,
      [username, email, avatar]
    );
    return new GithubUser(rows[0]);
  }

  static async findUsername(username) {
    if (!username) return;
    const { rows } = await pool.query(
      `
      SELECT * 
      FROM github_users
      WHERE username=$1`,
      [username]
    );
    return new GithubUser(rows[0]);
  }

  toJSON() {
    return { ...this };
  }
};
