import mysql from "mysql2/promise";
import config from "../utils/config.json" assert { type: "json" };
import bcrypt from "bcrypt";
import UserDTO from "../dto/user_dto.js";

let pool = mysql.createPool(config);

class User {
  async save(login, password, email, activationLink) {
    try {
      const connection = await pool.getConnection();
      const insertUserQuery =
        "INSERT INTO usof_database.users (login, password, email, activation_link) VALUES (?, ?, ?, ?)";
      const [result] = await connection.execute(insertUserQuery, [
        login,
        password,
        email,
        activationLink,
      ]);
      connection.release();
      if (result.affectedRows === 1) {
        console.log("User saved successfully");
      } else {
        console.error("Failed to save user");
      }
    } catch (error) {
      console.error("Database error:", error);
    }
  }

  async find_by_link(activationLink) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        "SELECT * FROM usof_database.users WHERE activation_link = ?",
        [activationLink]
      );
      if (rows.length === 1) {
        const user = rows[0];
        const updateQuery =
          "UPDATE usof_database.users SET activate = ? WHERE id = ?";
        const [updateResult] = await connection.execute(updateQuery, [
          true,
          user.id,
        ]);

        connection.release();

        if (updateResult.affectedRows === 1) {
          return user;
        } else {
          return null;
        }
      } else {
        connection.release();
        return null;
      }
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  }

  async checkExistingUser(login, email) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        "SELECT * FROM usof_database.users WHERE login = ? OR email = ?",
        [login, email]
      );
      connection.release();
      return rows.length > 0;
    } catch (error) {
      console.error("Database error:", error);
      return false;
    }
  }

  async findUserByEmail(email) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        "SELECT * FROM usof_database.USERS WHERE email = ?",
        [email]
      );
      connection.release();
      return rows;
    } catch (error) {
      console.error("Database error:", error);
      return false;
    }
  }

  async deleteRefreshToken(refreshToken) {
    try {
      const connection = await pool.getConnection();
      const deleteTokenQuery =
        "UPDATE usof_database.USERS SET refresh_token = ? WHERE refresh_token = ?";
      const [result] = await connection.execute(deleteTokenQuery, [
        null,
        refreshToken,
      ]);
      connection.release();
      return result;
    } catch (error) {
      console.error("Database error:", error);
      return false;
    }
  }

  async findUserByToken(refreshToken) {
    try {
      const connection = await pool.getConnection();
      const selectUserQuery =
        "SELECT * FROM usof_database.USERS WHERE refresh_token = ?";
      const [result] = await connection.execute(selectUserQuery, [
        refreshToken,
      ]);
      connection.release();
      return result;
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  }

  async changeResetLink(link, email) {
    try {
      const connection = await pool.getConnection();
      const findUserQuery = "SELECT * FROM usof_database.users WHERE email = ?";
      const [users] = await connection.query(findUserQuery, [email]);
      if (users.length > 0) {
        const updateUserQuery =
          "UPDATE usof_database.users SET reset_link = ? WHERE email = ?";
        const result = await connection.query(updateUserQuery, [link, email]);
        return result;
      }
      connection.release();
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  }

  async changePassword(resetToken, newPassword) {
    try {
      const connection = await pool.getConnection();
      const selectUserQuery =
        "SELECT * FROM usof_database.users WHERE reset_link = ?";
      const [users] = await connection.execute(selectUserQuery, [resetToken]);
      const password = await bcrypt.hash(newPassword, 3);
      if (users.length > 0) {
        const email = users[0].email;
        const updatePasswordQuery =
          "UPDATE usof_database.users SET password = ? WHERE email = ?";
        await connection.execute(updatePasswordQuery, [password, email]);
      } else {
        return null;
      }

      connection.release();
      return "Password changed successfully";
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  }

  async getUsers() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        "SELECT * FROM usof_database.users"
      );
      connection.release();
      return rows;
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  }

  async getUser(id) {
    try {
      const connection = await pool.getConnection();
      const query = "SELECT * FROM usof_database.users WHERE id = ?";
      const [rows] = await connection.execute(query, [id]);
      connection.release();
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  }

  async saveAvatarByEmail(avatarName, email) {
    try {
      const connection = await pool.getConnection();
      const sql = `UPDATE usof_database.users SET profile_picture = ? WHERE email = ?`;
      const [rows] = await connection.execute(sql, [avatarName, email]);
      connection.release();
      if (rows.affectedRows === 1) {
        return avatarName;
      } else {
        return "The user with the specified email was not found.";
      }
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  }

  async updateUser(id, data) {
    try {
      const connection = await pool.getConnection();
      const updateFields = Object.keys(data);
      const updateValues = Object.values(data);
      updateValues.push(id);
      const placeholders = updateFields
        .map((field) => `${field} = ?`)
        .join(", ");
      const sql = `UPDATE users SET ${placeholders} WHERE id = ?`;
      await connection.execute(sql, updateValues);
      const user = await this.getUser(id);
      const user_dto = new UserDTO(
        user.id,
        user.login,
        user.full_name,
        user.email,
        user.profile_picture,
        user.rating,
        user.role
      );
      connection.release();
      if (user) {
        return { user: user_dto };
      } else {
        return "The user with the specified email was not found.";
      }
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  }

  async deleteUser(id) {
    try {
      const connection = await pool.getConnection();
      const sql = "DELETE FROM users WHERE id = ?";
      const [rows] = await connection.execute(sql, [id]);
      connection.release();
      if (rows.affectedRows === 1) {
        return "The user was successfully deleted.";
      } else {
        return "The user with the specified ID was not found.";
      }
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  }
}

export default new User();
