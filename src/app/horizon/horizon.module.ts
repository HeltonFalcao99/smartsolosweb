import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTabsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule
} from '@angular/material';

import {HorizonListComponent} from './list/horizon-list.component';
import {HorizonRoutes} from './horizon.routing';
import {FormsModule} from '@angular/forms';
import {DesignacaoModule} from '../designacao/designacao.module';
import {HorizonDesignationComponent} from '../horizon-designation/horizon-designation.component';

@NgModule({
    declarations: [
        HorizonListComponent,
        HorizonDesignationComponent

    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule.forChild(HorizonRoutes),
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
        FormsModule,
        DesignacaoModule
    ]
})
export class HorizonModule {
}
