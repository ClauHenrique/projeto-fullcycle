import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';


const users = [
    {
        id: 1,
        name: "joao",
        password: "123" 
    },
    {
        id: 2,
        name: "popo",
        password: "123" 
    }
]

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService
        ){}

    async login(userName: string, password: string) {
        const user = await this.userService.findOne(userName, password)


        if (!user) {
            throw new UnauthorizedException()
        }

        const payload = {sub: user.id, userName: user.name}
        
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
