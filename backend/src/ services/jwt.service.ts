import {config} from "../config.js"
import jwt, {JwtPayload} from 'jsonwebtoken';






class JwtService {

    private getSecretKey(): string {
        if (!config.JWT_SECRET_KEY) {
            throw new Error("JWT secret key is not defined");
        }
        return config.JWT_SECRET_KEY;
    }

    generateToken(login: string) {
        const payload: JwtPayload = {login};
        return jwt.sign(payload, this.getSecretKey(), {expiresIn: '1d'});
    }


    verifyToken(token: string): JwtPayload {
        try {
            if (token.startsWith('token=')) {
                token = token.slice(6, token.length);
            }

            return jwt.verify(token, this.getSecretKey()) as JwtPayload;

        } catch (error) {
            throw new Error("Unable to verify token");
        }

    }

}
export default JwtService;