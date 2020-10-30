import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    MatToolbarModule
} from '@angular/material';

import {ToastrModule} from 'ngx-toastr';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './login/login.component';


import {SessionRoutes} from './session.routing';


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatDividerModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(SessionRoutes),
        ToastrModule.forRoot(),
        SlickCarouselModule
    ],
    providers: []
})
export class SessionModule {
}
