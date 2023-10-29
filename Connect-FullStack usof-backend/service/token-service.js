const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const config = require('../utils/config.json');
const {deleteRefreshToken, findUserByToken} = require('../utils/db.js');

let pool = mysql.createPool(config);

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    generateResetToken(payload) {
      const resetToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'24h'});
      return  resetToken;
    }

    async saveToken(email, refreshToken) {
      try {
        const connection = await pool.getConnection();
        const [userRows] = await connection.execute('SELECT id FROM usof_database.users WHERE email = ?', [email]);
        if (userRows.length === 0) {
          return false;
        }
        const userId = userRows[0].id;
        const updateQuery = 'UPDATE usof_database.users SET refresh_token = ? WHERE id = ?';
        const [updateResult] = await connection.execute(updateQuery, [refreshToken, userId]);
        connection.release();
        if (updateResult.affectedRows === 1) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Database error:', error);
        return false;
      }
    }

    validateAccessToken(token) {
      try {
        const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return userData;
      } catch (e) {
        return null;
      }
    }

    validateRefreshToken(token) {
      try {
        const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return userData;
      } catch (e) {
        return null;
      }
    }
    async removeToken(refreshToken) {
      const tokenData = deleteRefreshToken(refreshToken);
      return tokenData;
    }

    async findToken(refreshToken) {
      const tokenData = findUserByToken(refreshToken);
      return tokenData;
    }

    async getEmailByToken(token) {
        const parts = token.split(" ");
        const tokenValue = parts[1];
        const decodedToken = jwt.verify(tokenValue, process.env.JWT_ACCESS_SECRET);
        const email = decodedToken.email;
        return email;
    }
}

module.exports = new TokenService();