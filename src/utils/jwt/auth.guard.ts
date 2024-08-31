import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; 

    if (!token) {
        throw new UnauthorizedException('session expired! Please sign In')
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true; 
    } catch (error) {
        throw new ForbiddenException(error.message);
    }
  }
}
