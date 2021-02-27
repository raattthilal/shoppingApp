import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept( req: HttpRequest <any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
         
      
            const token = localStorage.getItem('token');

            if (token) {
                const cloned = req.clone({
                    headers: req.headers.set('Authorization','Bearer '+token)
                });
                return next.handle(cloned)
                // .catch(err =>{
                //     console.log(err);
                //     if(err instanceof HttpErrorResponse){
                //         if(err.status==401){
                //             localStorage.removeItem('token');
                //         }
                //     }
                //     return Observable.throw(err);
                // }) as any;
            } else {
                return next.handle(req);
            }      
        }
        
        
        
        
    }