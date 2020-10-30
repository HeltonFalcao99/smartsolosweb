import { Routes } from '@angular/router';

import { HorizonListComponent} from './list/horizon-list.component';


export const HorizonRoutes: Routes = [
   {
      path: '',
      children: [
         {
            path: 'formulario/:code',
            component: HorizonListComponent
         }
      ]
   }
];
