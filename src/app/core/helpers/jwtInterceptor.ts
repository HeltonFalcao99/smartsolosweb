import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = localStorage.getItem(environment.token);
        if (currentUser) {
            const token = JSON.parse(currentUser);
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'token': token.token,
                    'platform': 'web'
                }
            });
        } else {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'platform': 'web'
                }
            });

        }

        return next.handle(request);
    }

}
