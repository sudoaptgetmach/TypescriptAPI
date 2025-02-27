import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.split(' ')[1];
    
        console.log(`Seu token é: ${token}`);

        if (!token || token != '123456') throw new UnauthorizedException('Token inválido.');

        return next.handle();
    }
}