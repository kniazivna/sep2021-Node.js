import {usersService} from "./usersService";
import { Request, Response } from "express";
import {IUser} from "../entity/user";

class AuthService {
    public async registration(req: Request, res: Response) {
        const { email } = req.body;

        const userFromDB = usersService.getUserByEmail(email);

        if(userFromDB){
            throw new Error(`User with email: ${email}  already exist`);
        }

        const createdUser = usersService.createUser(req.body);
    }

    private _getTokenData(userData: IUser) {
        const tokensPair =  
    }
}

export const authService = new AuthService();