import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import config from './config.json' assert { type: "json" };

let pool = mysql.createPool(config);

const checkExistingUser = async (login, email) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM usof_database.users WHERE login = ? OR email = ?', [login, email]);
    connection.release();
    return rows.length > 0;

  } catch (error) {
    console.error('Database error:', error);
    return false;
  }
};

const findUserByEmail = async (email) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM usof_database.USERS WHERE email = ?', [email]);
    connection.release();
    return rows;
  } catch (error) {
    console.error('Database error:', error);
    return false;
  }
}

const deleteRefreshToken = async (refreshToken) => {
  try {
    const connection = await pool.getConnection();
    const deleteTokenQuery = 'UPDATE usof_database.USERS SET refresh_token = ? WHERE refresh_token = ?';
    const [result] = await connection.execute(deleteTokenQuery, [null, refreshToken]);
    connection.release();
    return result;
  } catch (error) {
    console.error('Database error:', error);
    return false;
  }
}

const findUserByToken = async (refreshToken) => {
  try {
    const connection = await pool.getConnection();
    const selectUserQuery = 'SELECT * FROM usof_database.USERS WHERE refresh_token = ?';
    const [result] = await connection.execute(selectUserQuery, [refreshToken]);
    connection.release();
    return result;
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
}

const changeResetLink = async (link, email) => {
  try {
    const connection = await pool.getConnection();
    const findUserQuery = 'SELECT * FROM usof_database.users WHERE email = ?';
    const [users] = await connection.query(findUserQuery, [email]);
    if (users.length > 0) {
      const updateUserQuery = 'UPDATE usof_database.users SET reset_link = ? WHERE email = ?';
      const result = await connection.query(updateUserQuery, [link, email]);
      return result;
    }
    connection.release();
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
};

const changePassword = async (resetToken, newPassword) => {
  try {
    const connection = await pool.getConnection();
    const selectUserQuery = 'SELECT * FROM usof_database.users WHERE reset_link = ?';
    const [users] = await connection.execute(selectUserQuery, [resetToken]);
    const password = await bcrypt.hash(newPassword, 3);
    if (users.length > 0) {
      const email = users[0].email;
      const updatePasswordQuery = 'UPDATE usof_database.users SET password = ? WHERE email = ?';
      await connection.execute(updatePasswordQuery, [password, email]);
    } else {
      return null;
    }

    connection.release();
    return 'Password changed successfully';
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
};

const getUsers = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM usof_database.users');
    connection.release();
    return rows;
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
}

const getUser = async (id) => {
  try {
    const connection = await pool.getConnection();
    const query = 'SELECT * FROM usof_database.users WHERE id = ?';
    const [rows] = await connection.execute(query, [id]);
    connection.release();
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
}

const saveAvatarByEmail = async (avatarName, email) => {
  try {
    const connection = await pool.getConnection();
    const sql = `UPDATE usof_database.users SET profile_picture = ? WHERE email = ?`;
    const [rows] = await connection.execute(sql, [avatarName, email]);
    connection.release();
    if (rows.affectedRows === 1) {
      return 'The avatar was successfully saved.';
    } else {
      return 'The user with the specified email was not found.';
    }
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
}

const updateUser = async (id, data) => {
  try {
    const connection = await pool.getConnection();
    const updateFields = Object.keys(data);
    const updateValues = Object.values(data);
    updateValues.push(id);
    const placeholders = updateFields.map(field => `${field} = ?`).join(', ');
    const sql = `UPDATE users SET ${placeholders} WHERE id = ?`;
    const [rows] = await connection.execute(sql, updateValues);
    connection.release();
    if (rows.affectedRows === 1) {
      return rows;
    } else {
      return 'The user with the specified email was not found.';
    }
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
}

const deleteUser = async (id) => {
  try {
    const connection = await pool.getConnection();
    const sql = 'DELETE FROM users WHERE id = ?';
    const [rows] = await connection.execute(sql, [id]);
    connection.release();
    if (rows.affectedRows === 1) {
      return 'The user was successfully deleted.';
    } else {
      return 'The user with the specified ID was not found.';
    }
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
}

export {
  checkExistingUser,
  findUserByEmail,
  deleteRefreshToken,
  findUserByToken,
  changeResetLink,
  changePassword,
  getUsers,
  getUser,
  saveAvatarByEmail,
  updateUser,
  deleteUser,
  pool,
};
