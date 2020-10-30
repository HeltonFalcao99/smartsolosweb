import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgmCoreModule} from '@agm/core';
import {
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatInputModule,
    MatChipsModule,
    MatListModule,
    MatTableModule,
    MatExpansionModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {ChartsModule} from 'ng2-charts';
import {QuillModule} from 'ngx-quill';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EmbedVideo} from 'ngx-embed-video';
import {BarRatingModule} from 'ngx-bar-rating';
import {RouterModule} from '@angular/router';
import {NgxEchartsModule} from 'ngx-echarts';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {EasyPieChartModule} from 'ng2modules-easypiechart';
import {PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

import {DeleteDialogComponent} from './pop-up/delete-dialog/delete-dialog.component';
import {AddNewCardComponent} from './pop-up/add-new-card/add-new-card.component';
import {AddNewUserComponent} from './pop-up/add-new-user/add-new-user.component';
import {EditNewUserComponent} from './pop-up/edit-new-user/edit-new-user.component';
import {AddNewClientComponent} from './pop-up/add-new-client/add-new-client.component';
import {EditNewClientComponent} from './pop-up/edit-new-client/edit-new-client.component';


import {AddNewProjectComponent} from './pop-up/add-new-project/add-new-project.component';
import {EditNewProjectComponent} from './pop-up/edit-new-project/edit-new-project.component';
import {AddNewExaminationComponent} from './pop-up/add-new-examination/add-new-examination.component';
import {SyncComponent} from './pop-up/sync/sync.component';
import {EditNewExaminationComponent} from './pop-up/edit-new-examination/edit-new-examination.component';
import {MapsComponent} from './pop-up/maps/maps.component';
import {ClassificationProjectComponent} from './classification-project/classification-project.component';


@NgModule({
    declarations: [
        DeleteDialogComponent,
        AddNewCardComponent,
        AddNewUserComponent,
        EditNewUserComponent,
        ClassificationProjectComponent,
        AddNewClientComponent,
        EditNewClientComponent,
        AddNewProjectComponent,
        EditNewProjectComponent,
        AddNewExaminationComponent,
        EditNewExaminationComponent,
        MapsComponent,
        SyncComponent
    ],
    imports: [
        RouterModule,
        BarRatingModule,
        EasyPieChartModule,
        CommonModule,
        MatCardModule,
        FlexLayoutModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        QuillModule,
        MatExpansionModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatMenuModule,
        MatDividerModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        ChartsModule,
        MatSnackBarModule,
        SlickCarouselModule,
        MatChipsModule,
        MatListModule,
        EmbedVideo.forRoot(),
        NgxEchartsModule,
        PerfectScrollbarModule,
        MatTableModule,
        AgmCoreModule.forRoot({apiKey: 'AIzaSyD4y2luRxfM8Q8yKHSLdOOdNpkiilVhD9k'})
    ],
    exports: [],
    entryComponents: [
        DeleteDialogComponent,
        AddNewCardComponent,
        AddNewUserComponent,
        AddNewProjectComponent,
        EditNewProjectComponent,
        EditNewUserComponent,
        AddNewClientComponent,
        EditNewClientComponent,
        AddNewExaminationComponent,
        EditNewExaminationComponent,
        MapsComponent, SyncComponent, ClassificationProjectComponent
    ]
})

export class WidgetComponentModule {
}
