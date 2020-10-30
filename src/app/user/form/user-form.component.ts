import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {fadeInAnimation} from '../../core/route-animation/route.animation';
import {CoreService} from '../../service/core/core.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
    selector: 'ms-user-form',
    templateUrl: './user-form-component.html',
    styleUrls: ['./user-form-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[@fadeInAnimation]': 'true'
    },
    animations: [fadeInAnimation]
})

export class UserFormComponent implements OnInit {

    public form: FormGroup;

    listProfiles: any;
    private idUser: any = 0;

    constructor(private coreService: CoreService, private fb: FormBuilder,
                private pageTitleService: PageTitleService, private route: ActivatedRoute,
                private toastr: ToastrService, private router: Router) {
        this.coreService.winProject = false;
        this.coreService.winSinc = false;

    }

    ngOnInit() {
        this.pageTitleService.setTitle('Usuario');
        this.route.paramMap.subscribe(params => {
            if (params.get('id') !== undefined) {
                this.idUser = params.get('id');
                this.renderViewForm();
                this.prepareProfile();
            }
        });

    }

    renderViewForm() {
        if (this.idUser) {

            this.form = this.fb.group({
                name: [null, Validators.compose([Validators.required])],
                login: [null, Validators.compose([Validators.required])],
                email: [null, Validators.compose([CustomValidators.email])],
                profile: [null, Validators.required],
                password: '',
                confirmPassword: ''
            });


        } else {
            this.form = this.fb.group({
                name: [null, Validators.compose([Validators.required])],
                login: [null, Validators.compose([Validators.required])],
                email: [null, Validators.compose([CustomValidators.email])],
                profile: [null, Validators.required],
                password: password,
                confirmPassword: confirmPassword
            });

        }
    }

    getUser() {
        this.coreService.getUser(this.idUser).subscribe(res => {
                this.prepareUser(res);
            },
            err => this.toastr.error('Houve um problema ao consultar o(s) registro(s)!')
        );
    }

    prepareUser(res) {
        if (res && res['status'] === 200) {
            this.form.patchValue({
                name: res['data']['name'],
                login: res['data']['login'],
                email: res['data']['email'],
                profile: res['data']['profile']['id'],
                pwd: '',
                confirmPassword: ''
            });
        }
    }


    prepareProfile() {
        this.coreService.getProfileList().subscribe(res => {
                if (res['status'] === 200) {
                    this.listProfiles = res['data'];
                    if (this.idUser) { this.getUser(); }

                }
            },
            err => this.toastr.error('Houve um problema ao consultar o(s) registro(s)!')
        );
    }

    onFormSubmit() {
        let body = {};
        if (this.form.value.password && this.form.value.password !== '') {
            body = {
                'name': this.form.value.name,
                'login': this.form.value.login,
                'password': this.form.value.password,
                'email': this.form.value.email,
                'profile': {
                    'id': this.form.value.profile
                }
            };
        } else {
            body = {
                'name': this.form.value.name,
                'login': this.form.value.login,
                'email': this.form.value.email,
                'profile': {
                    'id': this.form.value.profile
                }
            };
        }


        if (this.idUser) {

            this.coreService.putUser(body, this.idUser).subscribe(res => {
                    if (res['status'] === 200) {
                        this.toastr.success('Sucesso ao salvar o registro!');
                    }
                },
                err => this.toastr.error('Houve um problema ao salvar o registro!')
            );
        } else {
            this.coreService.postUser(body).subscribe(res => {
                    if (res['status'] === 201) {
                        this.toastr.success('Sucesso ao salvar o registro!');
                        this.router.navigate(['/usuario/lista']);
                    }
                },
                err => this.toastr.error('Houve um problema ao salvar o registro!')
            );

        }

    }

}



