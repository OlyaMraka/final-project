import {IUser} from "../interfaces/user.interface";
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

class AuthService {
    public async signIn(credentials: SignInDto): Promise<{user: IUser, token: TokenPair}>{
        const user = await userRepository.getByEmail(credentials.email);

        if(user.banned){
            throw new ApiError(StatusCodes.FORBIDDEN, ServiceConstants.SIGN_IN_ERROR_USER_BANNED);
        }

        const isPasswordValid = await passwordService.comparePassword(credentials.password, user.password);

        if(!isPasswordValid) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, ServiceConstants.INVALID_EMAIL_OR_PASSWORD);
        }

        const token = tokenService.generateTokens({
            userId: user._id,
        });
        await tokenRepository.create({...token, _userId: user._id});

        return {
            user,
            token
        }
    }

    public async setUserPassword(passwordDto: SetPasswordDto): Promise<TokenPair> {
        const tokenPayload = tokenService.verifyToken(passwordDto.activationToken, TokenType.ACTIVATION);

        const passwordHash = await passwordService.hashPassword(passwordDto.password);
        await userRepository.setUserPassword(tokenPayload.userId, passwordHash);

        return tokenService.generateTokens({userId: tokenPayload.userId});
    }
}

export const authService = new AuthService();
