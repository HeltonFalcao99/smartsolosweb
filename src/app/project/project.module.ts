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


import {ProjectListComponent} from './list/project-list.component';
import {ProjectRoutes} from './project.routing';
import {WidgetComponentModule} from '../widget-component/widget-component.module';

@NgModule({
    declarations: [
        ProjectListComponent

    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule.forChild(ProjectRoutes),
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
export class ProjectModule {
}
