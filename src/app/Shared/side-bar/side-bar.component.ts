import {Component, OnInit, Input} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {CoreService} from '../../service/core/core.service';
import {AuthService} from '../../service/auth-service/auth.service';
import {MenuItems} from '../../core/menu/menu-items/menu-items';

@Component({
    selector: 'ms-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent implements OnInit {

    @Input() menuList: any;
    @Input() verticalMenuStatus: boolean;

    constructor(private router: Router,
                private authService: AuthService,
                public coreService: CoreService,
                public menuItems: MenuItems) {
    }

    ngOnInit() {
    }

    //render to the crm page
    onClick() {
        // var first = location.pathname.split('/')[1];
        // if(first == 'horizontal'){
        //    this.router.navigate(['/horizontal/dashboard/crm']);
        // }else {
        //    this.router.navigate(['/dashboard/crm']);
        // }
    }


    help(): void {
        this.router.navigate(['/tutorial']);
    }


    getName() {
        return this.authService.userData.name;
    }

    /**
     * addMenuItem is used to add a new menu into menu list.
     */
    logout(): void {
        this.authService.logOut();
    }

}
