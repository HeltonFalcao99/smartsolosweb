import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userData: any;
    isLoggedIn = false;

    constructor(private router: Router,
                private toastr: ToastrService,
                private cookieService: CookieService,
                private http: HttpClient) {
    }

    /*
     *  getLocalStorageUser function is used to get local user profile data.
     */
    getLocalStorageUser() {
        if (localStorage.getItem(environment.token) == null) {
            this.isLoggedIn = false;
            return false;
        }
        this.userData = JSON.parse(localStorage.getItem(environment.token));
        const token = this.cookieService.get(environment.token);
        if (token) {
            this.isLoggedIn = true;
            return true;
        } else {
            this.isLoggedIn = false;
            return false;
        }
    }

    /*
     * loginUser fuction used to login
     */
    loginUser(auth: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': auth
            })
        };
        return this.http.post(environment.apiUrl + 'users/login', {}, httpOptions).pipe(map(response => response));
    }


    /*
     * logOut function is used to sign out
     */
    logOut() {
        localStorage.removeItem(environment.token);
        this.cookieService.delete(environment.token);
        this.isLoggedIn = false;
        this.toastr.success('Desconectado com sucesso!');
        this.router.navigate(['/session/login']);
    }

    /*
     * setLocalUserProfile function is used to set local user profile data.
     */
    setLocalUserProfile(value) {

        const today = new Date();
        const expiresValue = new Date(today);
        expiresValue.setSeconds(today.getSeconds() + 86400);
        const token = JSON.stringify(value);
        localStorage.setItem(environment.token, token);
        this.cookieService.set(environment.token, value.token, expiresValue);
        this.getLocalStorageUser();
        this.isLoggedIn = true;
    }
}
