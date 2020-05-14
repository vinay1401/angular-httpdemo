import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
    
    intercept(request: HttpRequest<any>, next: HttpHandler){
        console.log("Intercepting.....");

        const newReq = request.clone({
            params: request.params.append("inteceptor", "true")
        })

        return next.handle(newReq).pipe(
            tap(event =>{
                console.log(event);
                if(event.type === HttpEventType.Response){
                    console.log(event.body);
                }
            })
        );
    }
}