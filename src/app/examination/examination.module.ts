import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule,
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
	MatSelectModule } from '@angular/material';

import { ExaminationListComponent}  from './list/examination-list.component';
import {ExaminationRoutes} from "./examination.routing";
import { WidgetComponentModule } from '../widget-component/widget-component.module';

@NgModule({
	declarations: [
		ExaminationListComponent

	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		RouterModule.forChild(ExaminationRoutes),
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
export class ExaminationModule { }
