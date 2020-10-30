import { Routes } from '@angular/router';

import { UserListComponent}  from './list/user-list.component';
import {UserFormComponent} from './form/user-form.component';


export const UserRoutes: Routes = [
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
            component: UserListComponent
         }
         ,
         {
            path: 'formulario',
            component: UserFormComponent
         }
         ,
         {
            path: 'formulario/:id',
            component: UserFormComponent
         }
      ]
   }
];
