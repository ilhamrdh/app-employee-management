import { prismaClient } from '../configs/database';
import { ResponseError } from '../exceptions/error-response';
import { LoginRequest, RegisterRequest, toUserResponse, UserResponse } from '../models/user-model';
import { Validation } from '../validation';
import bcrypt from 'bcrypt';
import { UserValidation } from '../validation/user-validation';
import { Token } from '../utils/token';

export class UserService {
  static async register(req: RegisterRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.Register, req);

    const userExist = await prismaClient.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (userExist !== 0) {
      throw new ResponseError(400, 'Username already axist');
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }

  static async login(req: LoginRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.Login, req);

    const user = await prismaClient.user.findUnique({
      where: { username: loginRequest.username },
    });

    if (!user) {
      throw new ResponseError(400, 'Username or Password is worng');
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
      throw new ResponseError(400, 'Username or Password is worng');
    }

    const { accessToken, refreshToken } = Token.generateTokens({
      role: user.role,
      username: user.username,
    });

    const response = toUserResponse(user);
    response.token = accessToken;
    response.refresh_token = refreshToken;

    return response;
  }

  static async refreshToken(refreshToken: string): Promise<string> {
    const tokenData = Token.verifyRefreshToken(refreshToken);
    const newToken = Token.generateAccessToken(tokenData);
    return newToken;
  }
}
