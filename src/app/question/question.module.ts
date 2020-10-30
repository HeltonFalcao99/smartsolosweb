import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTableModule,
    MatDividerModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTabsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule
} from '@angular/material';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BarRatingModule} from 'ngx-bar-rating';
import {CardModule} from 'ngx-card/ngx-card';
import { AgmCoreModule } from '@agm/core';
import {QuestionRoutes} from './question.routing';
import {QuestionFormComponent} from './form/question-form.component';
import {WidgetComponentModule} from '../widget-component/widget-component.module';
import {DesignacaoModule} from '../designacao/designacao.module';

@NgModule({
    declarations: [
        QuestionFormComponent,

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(QuestionRoutes),
        FlexLayoutModule,
        MatCardModule,
        CardModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        MatGridListModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatTabsModule,
        MatChipsModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        BarRatingModule,
        WidgetComponentModule,
        MatDatepickerModule,
        MatTableModule,
        AgmCoreModule.forRoot({apiKey: 'AIzaSyD4y2luRxfM8Q8yKHSLdOOdNpkiilVhD9k'}),
        DesignacaoModule
    ]
})
export class QuestionModule {
}
