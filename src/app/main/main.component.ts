import {filter} from 'rxjs/operators';
import {Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {MenuItems} from '../core/menu/menu-items/menu-items';
import {BreadcrumbService} from 'ng5-breadcrumb';
import {PageTitleService} from '../core/page-title/page-title.service';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../service/auth-service/auth.service';
import {CoreService} from '../service/core/core.service';
import * as uuid from 'uuid';
import {environment} from '../../environments/environment';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'ms-gene-layout',
    templateUrl: './main-material.html',
    styleUrls: ['./main-material.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '(window:resize)': 'onResize($event)'
    }
})

export class MainComponent implements OnInit, OnDestroy {
    popUpNewProjectResponse: any;
    currentUrl: any;
    root: any = 'ltr';
    layout: any = 'ltr';
    currentLang: any = 'en';
    customizerIn: boolean = false;
    showSettings: boolean = false;
    chatpanelOpen: boolean = false;
    sidenavOpen: boolean = true;
    isMobile: boolean = false;
    isFullscreen: boolean = false;
    collapseSidebarStatus: boolean;
    header: string;
    dark: boolean;
    compactSidebar: boolean;
    isMobileStatus: boolean;
    sidenavMode: string = 'side';
    popupDeleteResponse: any;
    sidebarColor: any;
    url: string;
    windowSize: number;
    private _routerEventsSubscription: Subscription;
    private _router: Subscription;
    @ViewChild('sidenav', {static: true}) sidenav;
    dataResponse: any;

    constructor(public menuItems: MenuItems,
                private breadcrumbService: BreadcrumbService,
                private pageTitleService: PageTitleService,
                private router: Router,
                private toastr: ToastrService,
                private authService: AuthService,
                public coreService: CoreService) {


        // breadcrumbService.addFriendlyNameForRoute('/projeto/lista/', 'projeto');
        // breadcrumbService.addFriendlyNameForRoute('/pergunta/formuario/', 'pergunta');
        // breadcrumbService.addFriendlyNameForRoute('/horizonte/fomulario', 'teste');


    }

    ngOnInit() {
        this.coreService.collapseSidebarStatus = this.coreService.collapseSidebar;
        this.pageTitleService.title.subscribe((val: string) => {
            this.header = val;
        });

        this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            this.coreService.collapseSidebarStatus = this.coreService.collapseSidebar;
            this.url = event.url;
            this.customizeSidebar();
        });
        this.url = this.router.url;
        this.customizeSidebar();

        setTimeout(() => {
            this.windowSize = window.innerWidth;
            this.resizeSideBar();
        }, 0)


        this._routerEventsSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && this.isMobile) {
                this.sidenav.close();
            }
        });
    }


    getProject() {
        return this.coreService.winProject;
    }

    getSinc() {
        return this.coreService.winSinc;
    }

    ngOnDestroy() {
        this._router.unsubscribe();
    }

    /**
     *As router outlet will emit an activate event any time a new component is being instantiated.
     */
    onActivate(e, scrollContainer) {
        scrollContainer.scrollTop = 0;
    }


    /**
     * toggleSidebar method is used a toggle a side nav bar.
     */
    toggleSidebar() {
        this.coreService.sidenavOpen = !this.coreService.sidenavOpen;
    }


    onResize(event) {
        this.windowSize = event.target.innerWidth;
        this.resizeSideBar();
    }

    customizeSidebar() {
        if (window.innerWidth < 1200) {
            this.coreService.sidenavMode = 'over';
            this.coreService.sidenavOpen = false;
            const main_div = document.getElementsByClassName('app');
            for (let i = 0; i < main_div.length; i++) {
                if (!(main_div[i].classList.contains('sidebar-overlay'))) {
                    document.getElementById('main-app').className += ' sidebar-overlay';
                }
            }
        }
    }

    resizeSideBar() {
        if (this.windowSize < 1200) {
            this.isMobileStatus = true;
            this.isMobile = this.isMobileStatus;
            this.coreService.sidenavMode = 'over';
            this.coreService.sidenavOpen = false;
            const main_div1 = document.getElementsByClassName('app');
            for (let i = 0; i < main_div1.length; i++) {
                if (!(main_div1[i].classList.contains('sidebar-overlay'))) {
                    if (document.getElementById('main-app')) {
                        document.getElementById('main-app').className += ' sidebar-overlay';
                    }
                }
            }
        } else {
            this.isMobileStatus = false;
            this.isMobile = this.isMobileStatus;
            this.coreService.sidenavMode = 'side';
            this.coreService.sidenavOpen = true;
            const main_div2 = document.getElementsByClassName('app');
            for (let i = 0; i < main_div2.length; i++) {
                if (main_div2[i].classList.contains('sidebar-overlay')) {
                    document.getElementById('main-app').classList.remove('sidebar-overlay');
                }
            }
        }
    }


    /**
     * addNewProjectDialog method is used to open a add new project dialog.
     */
    addNewProjectDialog() {


        this.coreService.addNewProjectDailog().subscribe(res => {
                this.popUpNewProjectResponse = res
            },
            err => console.log(err),
            () => this.getAddProjectPopupResponse(this.popUpNewProjectResponse))
    }


    /**
     *getAddProjectPopupResponse method is used to get a new project dialog response.
     *if response will be get then add new project into project list.
     */
    getAddProjectPopupResponse(response: any) {
        if (response) {
            const code = uuid.v4();
            const addProject = {
                idRealm: code,
                name: response.projectName,
                id: 0,
                creationDate: new Date()
            };
            this.addProject(addProject);
        }
    }

    addProject(addProject) {
        this.coreService.projectlist.push(addProject);
        const currentUser = JSON.parse(localStorage.getItem(environment.token));
        localStorage.setItem('projects-' + currentUser.id, JSON.stringify(this.coreService.projectlist));
    }


    onSync() {
        this.coreService.syncDailog().subscribe(res => {
                this.loadGetAll();
            },
            err => this.toastr.error('Houve um problema ao comunição com servidor!'));
    }


    loadGetAll() {

        this.coreService.getAll().subscribe(res => {
                this.dataResponse = res
            },
            err => this.toastr.error('Houve um problema ao comunição com servidor!'),
            () => this.coreService.processar(this.dataResponse));


    }


}
