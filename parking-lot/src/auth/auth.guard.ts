import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpService,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;
    const config = { headers: { authorization } };
    const url = process.env.AUTH_URL;

    try {
      await this.httpService.post(url, {}, config).toPromise();
      return true;
    } catch (error) {
      return false;
    }
  }
}
