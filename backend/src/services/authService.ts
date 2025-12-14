import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel, CreateUserData } from '../models/User';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  token: string;
}

export class AuthService {
  static async register(data: RegisterData): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await UserModel.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const password_hash = await bcrypt.hash(data.password, 10);

    // Create user
    const userData: CreateUserData = {
      email: data.email,
      password_hash,
      name: data.name,
      role: 'user',
    };

    const user = await UserModel.create(userData);

    // Generate token
    const token = this.generateToken(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  }

  static async login(data: LoginData): Promise<AuthResponse> {
    // Find user
    const user = await UserModel.findByEmail(data.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValid = await bcrypt.compare(data.password, user.password_hash);
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = this.generateToken(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  }

  private static generateToken(userId: number, email: string, role: string): string {
    return jwt.sign(
      { userId, email, role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }
}

