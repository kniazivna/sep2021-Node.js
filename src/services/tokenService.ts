import jwt from "jsonwebtoken";

class TokenService{
   public async generateTokenPair(payload: any): Promise<{ accessToken: string, refreshToken: string }> {
       const accessToken = jwt.sign(payload, 'SECRER_ACCESS_KEY', {expiresIn: '15m'});
   }
}

export const tokenService = new TokenService();