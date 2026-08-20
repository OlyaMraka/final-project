import {TokenPair} from "../interfaces/token.interface";
import {passwordService} from "./password.service";
import {userRepository} from "../repositories/user.repository";
import {tokenService} from "./token.service";
import {tokenRepository} from "../repositories/token.repository";
import {SetPasswordDto, SignInDto} from "../dtos/auth.dto";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {ServiceConstants} from "../constants/error.constants";
import {TokenType} from "../enums/tokenType.enum";
import {UserResponseDto} from "../dtos/user.dto";
import {userService} from "./user.service";

class AuthService {
    public async signIn(credentials: SignInDto): Promise<{user: UserResponseDto, token: TokenPair}>{
        const user = await userRepository.getByEmail(credentials.email);

        if(!user) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, ServiceConstants.USER_NOT_FOUND);
        }

        if(user.banned){
            throw new ApiError(StatusCodes.FORBIDDEN, ServiceConstants.SIGN_IN_ERROR_USER_BANNED);
        }

        if(!user.isActive){
            throw new ApiError(StatusCodes.FORBIDDEN, ServiceConstants.USER_NOT_ACTIVE);
        }

        const isPasswordValid = await passwordService.comparePassword(credentials.password, user.password);

        if(!isPasswordValid) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, ServiceConstants.INVALID_EMAIL_OR_PASSWORD);
        }

        const token = tokenService.generateTokens({
            userId: user._id,
        });
        await tokenRepository.create({...token, _userId: user._id});

        const userResponse = userService.mapUserToResponse(user);

        return {
            user: userResponse,
            token
        };
    }

    public async setUserPassword(passwordDto: SetPasswordDto): Promise<TokenPair> {
        const tokenPayload = tokenService.verifyToken(passwordDto.activationToken, TokenType.ACTIVATION);

        const passwordHash = await passwordService.hashPassword(passwordDto.password);
        await userRepository.setUserPassword(tokenPayload.userId, passwordHash);

        const token = tokenService.generateTokens({userId: tokenPayload.userId});
        await tokenRepository.create({...token, _userId: tokenPayload.userId});

        return token;
    }
}

export const authService = new AuthService();
