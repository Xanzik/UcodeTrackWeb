import mysql from 'mysql2/promise';
import config from '../utils/config.json' assert { type: "json" };
let pool = mysql.createPool(config);

class User {
  constructor(login, password, email, activationLink, role) {
    this.login = login;
    this.password = password;
    this.email = email;
    this.activationLink = activationLink;
    this.role = role; // Replace with an appropriate default value
    // You can initialize other properties to default values if needed
    this.id = null; // Assuming that 'id' is auto-generated in the database
    this.fullName = null; // Replace with an appropriate default value
    this.profilePicture = null; // Replace with an appropriate default value
    this.rating = null; // Replace with an appropriate default value
  }
    async save() {
        try {
          const connection = await pool.getConnection();
          const insertUserQuery = 'INSERT INTO usof_database.users (login, password, email, activation_link) VALUES (?, ?, ?, ?)';
          const [result] = await connection.execute(insertUserQuery, [this.login, this.password, this.email, this.activationLink]);
          connection.release();
          if (result.affectedRows === 1) {
            console.log('User saved successfully');
          } else {
            console.error('Failed to save user');
          }
        } catch (error) {
          console.error('Database error:', error);
        }
    }

    async find_by_link(activationLink) {
      try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM usof_database.users WHERE activation_link = ?', [activationLink]);
    
        if (rows.length === 1) {
          const user = rows[0];
          const updateQuery = 'UPDATE usof_database.users SET activate = ? WHERE id = ?';
          const [updateResult] = await connection.execute(updateQuery, [true, user.id]);
    
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
        console.error('Database error:', error);
        return null;
      }
    }
}

export default User;
