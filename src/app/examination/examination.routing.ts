import { Routes } from '@angular/router';

import { ExaminationListComponent}  from './list/examination-list.component';


export const ExaminationRoutes: Routes = [
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
            component: ExaminationListComponent
         },
         {
            path: 'lista/:code',
            component: ExaminationListComponent
         }
      ]
   }
];
