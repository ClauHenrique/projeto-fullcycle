import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const token = this.extractTocken(request)
   
    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = this.jwtService.verify(token)
      
      request['user'] = payload
      return true
      
    } catch (error) {

      throw new UnauthorizedException()
    }
  }

  private extractTocken(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(" ") ?? []
    return type === 'Bearer' ? token: undefined
  }
}
