import User from '../models/User.js';
import mailService from './mail-service.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import tokenService from './token-service.js';
import ApiError from '../exceptions/api-error.js';

class UserService {
    async register(userData) {
        const { login, password, passwordConfirmation, email } = userData;

        if (!login || !password || !passwordConfirmation || !email) {
          throw ApiError.BadRequest(`Please provide all required fields`);
          }
        
          if (password !== passwordConfirmation) {
            throw ApiError.BadRequest('Password and password confirmation do not match');
          }
        
          if (await User.checkExistingUser(login, email)) {
            throw ApiError.BadRequest('User already exists');
          }
        
          try {
            const hashedPassword = await bcrypt.hash(password, 3);
            const activationLink = uuidv4();
            await User.save(login, hashedPassword, email, activationLink);
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);
            const tokens = await tokenService.generateTokens({email: email});
            await tokenService.saveToken(email, tokens.refreshToken);
            return { ...tokens, user: email, status: 0, message: 'User registered successfully' };
          } catch (error) {
            throw ApiError.BadRequest('Error registering user:', error);
          }
    }

    async login(userData) {
      const { email, password } = userData;
        const [rows] = await User.findUserByEmail(email);
        if (!rows) {
          throw ApiError.BadRequest('User not found');
        }
        const user = rows;
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw ApiError.BadRequest('Incorrect password');
        }
        if (!user.activate) {
          throw ApiError.BadRequest('User must activate his account');
        }
        const tokens = await tokenService.generateTokens({email: email, id: user.id, login: user.login, role: user.role});
        await tokenService.saveToken(email, tokens.refreshToken);
        return { ...tokens, user: user.email, role: user.role, status: 0, message: 'The user logged in successfully' };
    }

    async logout(refreshToken) {
      const token = await tokenService.removeToken(refreshToken);
      return token;
    }

    async refresh(refreshToken) {
      if(!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const userData = await tokenService.validateRefreshToken(refreshToken);
      const [userWithToken] = await tokenService.findToken(refreshToken);
      if(!userData || !userWithToken) {
        throw ApiError.UnauthorizedError();
      }
      const tokens = await tokenService.generateTokens({email: userWithToken.email});
      await tokenService.saveToken(userWithToken.email, tokens.refreshToken);
      return { ...tokens, userWithToken: userWithToken.email, status: 0, message: 'The token refreshed successfully' };
    }

    async passwordReset(email) {
      try {
        const resetLink = await tokenService.generateResetToken({email});

        await mailService.sendResetPasswordMail(email, `${process.env.API_URL}/api/auth/password-reset/${resetLink}`);
        await User.changeResetLink(resetLink, email);
        return { status: 0, message: 'Password reset sended on email' };
      } catch (error) {
        throw ApiError.BadRequest('Error sending reset:', error);
      }
    }

    async passwordResetConfirm(newPassword, token) {
      const fonded_user = await User.changePassword(token, newPassword);
      if(!fonded_user) {
        throw ApiError.BadRequest('Link not found');
      }
      return {status: 0, message: 'Password was changed'};
    }

    async activate(activationLink) {
      const user = new User();
      const fonded_user = await user.find_by_link(activationLink);
      console.log(fonded_user);
      if(!fonded_user) {
        throw ApiError.BadRequest('Link not found');
      }
      return {status: 0, message: 'The user activated the account successfully'};
    }

    async getUsers() {
      const users = await User.getUsers();
      return users;
    }

    async getUserByID(id) {
      const user = await User.getUser(id);
      return user;
    }

    async createNewUser(userData) {
      const { login, password, passwordConfirmation, email, role } = userData;

      if (!login || !password || !passwordConfirmation || !email || !role) {
        throw ApiError.BadRequest(`Please provide all required fields`);
        }
      
        if (password !== passwordConfirmation) {
          throw ApiError.BadRequest('Password and password confirmation do not match');
        }
      
        if (await checkExistingUser(login, email)) {
          throw ApiError.BadRequest('User already exists');
        }
      
        try {
          const hashedPassword = await bcrypt.hash(password, 3);
          const activationLink = uuidv4();
          const newUser = new User(login, hashedPassword, email, activationLink);
          await newUser.save();
          await mailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);
          const tokens = await tokenService.generateTokens({email});
          await tokenService.saveToken(email, tokens.refreshToken);
          return { ...tokens, user: newUser.email, status: 0, message: 'User registered successfully' };
        } catch (error) {
          throw ApiError.BadRequest('Error registering user:', error);
        }
      }

      async updateUserAvatar(file, token) {
        const avatarName = uuid.v4() + ".jpg";
        file.mv(process.env.FILE_PATH + "\\" + avatarName);
        const email = await tokenService.getEmailByToken(token);
        const result = await User.saveAvatarByEmail(avatarName, email);
        return result;
      }

      async updateUser(id, data) {
        try {
          const results = await User.updateUser(id, data);
          if (results.affectedRows > 0) {
            return results;
          } else {
            throw ApiError.BadRequest('User not found');
          }
        } catch (error) {
          throw error;
        }
      }

      async deleteUser(id) {
        try {
          const results = await User.deleteUser(id);
          if (results.affectedRows > 0) {
            return results;
          }
        } catch (error) {
          throw error;
        }
      }

}

export default new UserService();