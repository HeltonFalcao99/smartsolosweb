import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {MatIconRegistry} from '@angular/material';
import 'hammerjs';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {Ng5BreadcrumbModule, BreadcrumbService} from 'ng5-breadcrumb';
import {TourMatMenuModule} from 'ngx-tour-md-menu';
import {ToastrModule} from 'ngx-toastr';
import {
    MatSlideToggleModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    MatDialogModule,
    MatGridListModule
} from '@angular/material';
import {RoutingModule} from './app-routing.module';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {AuthService} from './service/auth-service/auth.service';
import {PageTitleService} from './core/page-title/page-title.service';
import {SmartSolosAppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {MenuToggleModule} from './core/menu/menu-toggle.module';
import {MenuItems} from './core/menu/menu-items/menu-items';
import {AuthGuard} from './core/guards/auth.guard';
import {WidgetComponentModule} from './widget-component/widget-component.module';
import {SideBarComponent} from './Shared/side-bar/side-bar.component';

import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {AppDateAdapter, APP_DATE_FORMATS} from './Shared/format-datepicker';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RoutingModule,
        FlexLayoutModule,
        NgbModalModule.forRoot(),
        Ng5BreadcrumbModule.forRoot(),
        TourMatMenuModule.forRoot(),
        PerfectScrollbarModule,
        MenuToggleModule,
        HttpClientModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatBadgeModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatExpansionModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatChipsModule,
        MatListModule,
        MatSidenavModule,
        MatTabsModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatSliderModule,
        MatRadioModule,
        MatDialogModule,
        MatGridListModule,
        ToastrModule.forRoot(),
        WidgetComponentModule,
        LoadingBarRouterModule,
        LoadingBarRouterModule
    ],
    declarations: [
        SmartSolosAppComponent,
        MainComponent,
        SideBarComponent
    ],
    bootstrap: [SmartSolosAppComponent],
    providers: [
        [{provide: LocationStrategy, useClass: HashLocationStrategy}],
        MenuItems,
        BreadcrumbService,
        PageTitleService,
        AuthService,
        {provide: DateAdapter, useClass: AppDateAdapter},
        {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        AuthGuard

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmartSolosAppModule {

    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        // Or whatever path you placed mdi.svg at
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('assets/mdi.svg'));
    }

}
