import {Routes} from '@angular/router';
import {ProjectListComponent} from './list/project-list.component';

export const ProjectRoutes: Routes = [
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
                component: ProjectListComponent
            }
        ]
    }
];
