import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../service/auth-service/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UtilService} from '../../service/util/util.service';

@Component({
    selector: 'ms-login-session',
    templateUrl: './login-component.html',
    styleUrls: ['./login-component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {

    login: string;
    password: string;

    constructor(public authService: AuthService, private router: Router, private toastr: ToastrService, private util: UtilService) {
    }

    access(value) {
        // const auth = 'Basic ' + btoa(value.login + ':' + this.util.ecryptAES(value.password));
        const auth = 'Basic ' + btoa(value.login + ':' + value.password);
        this.authService.loginUser(auth).subscribe(res => {
                this.responseAccess(res);
            },
            err => this.toastr.info('Login ou Senha incorretos!')
        );
    }

    responseAccess(res) {
        if (res.status === 200) {
            this.authService.setLocalUserProfile(res.data);
            this.router.navigate(['/projeto'])
        }
    }

}



