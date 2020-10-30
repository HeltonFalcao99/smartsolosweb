import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {AuthGuard} from './core/guards/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './core/helpers/jwtInterceptor';
import {ErrorInterceptor} from './core/helpers/error.interceptor';

const appRoutes: Routes = [
    {
        path: 'session',
        loadChildren: () => import('./session/session.module').then(m => m.SessionModule)
    },
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        children: [
            {path: 'projeto', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)},
            // {
            //     path: 'exame',
            //     loadChildren: () => import('./examination/examination.module').then(m => m.ExaminationModule)
            // },
            {
                path: 'tutorial',
                loadChildren: () => import('./help/help.module').then(m => m.HelpModule)
            },
            {path: 'pergunta', loadChildren: () => import('./question/question.module').then(m => m.QuestionModule)},
            {path: 'horizonte', loadChildren: () => import('./horizon/horizon.module').then(m => m.HorizonModule)},
            {path: 'usuario', loadChildren: () => import('./user/user.module').then(m => m.UserModule)}
        ]
    },
    {
        path: '**',
        redirectTo: 'session/login'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

    ]
})
export class RoutingModule {
}
