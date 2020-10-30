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
    MatSelectModule
} from '@angular/material';


import {HelpListComponent} from './list/help-list.component';
import {HelpRoutes} from './help.routing';
import {WidgetComponentModule} from '../widget-component/widget-component.module';

@NgModule({
    declarations: [
        HelpListComponent

    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule.forChild(HelpRoutes),
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
        WidgetComponentModule,//verificar os componentes
        MatSortModule
    ]
})
export class HelpModule {
}
