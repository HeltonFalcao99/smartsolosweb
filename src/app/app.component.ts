import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'smartsolos-app',
    template: `
        <router-outlet></router-outlet>
        <ngx-loading-bar></ngx-loading-bar>`,
    encapsulation: ViewEncapsulation.None
})

export class SmartSolosAppComponent {
    constructor() {
    }
}
