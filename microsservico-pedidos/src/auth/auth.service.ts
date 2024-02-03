import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


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
    constructor(private jwtService: JwtService){}

    login(userName: string, password: string) {
        const user = users.find(
            (user) => user.name === userName && user.password == password
        )

        if (!user) {
            throw new UnauthorizedException()
        }

        const payload = {sub: user.id, userName: user.name}

        return {
            acces_token: this.jwtService.sign(payload)
        }
    }
}
