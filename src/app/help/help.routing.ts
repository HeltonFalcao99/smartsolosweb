import {Routes} from '@angular/router';
import {HelpListComponent} from './list/help-list.component';

export const HelpRoutes: Routes = [
    {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                path: 'lista',
                component: HelpListComponent
            }
        ]
    }
];
