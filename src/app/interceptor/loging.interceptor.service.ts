import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class LoggingInterceptorService implements HttpInterceptor {
    intercept(request: HttpRequest<any>, handler: HttpHandler){
        console.log('This is logging interceptor')
        return handler.handle(request);
    }
}