import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatDividerModule,
    MatCheckboxModule,
    MatTableModule,
    MatTabsModule,
    MatChipsModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressBarModule
} from '@angular/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {UserListComponent} from './list/user-list.component';
import {UserFormComponent} from './form/user-form.component';
import {UserRoutes} from './user.routing';

@NgModule({
    declarations: [
        UserListComponent,
        UserFormComponent

    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule.forChild(UserRoutes),
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatDividerModule,
        MatCheckboxModule,
        MatTableModule,
        MatTabsModule,
        MatChipsModule,
        MatSelectModule,
        MatRadioModule,
        MatProgressBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatSortModule
    ]
})
export class UserModule {
}
