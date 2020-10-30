import {Routes} from '@angular/router';

import {QuestionFormComponent} from './form/question-form.component';

export const QuestionRoutes: Routes = [
    {
        path: '',
        component: QuestionFormComponent
    },
    {
        path: '',
        children: [
            {
                path: 'pergunta',
                component: QuestionFormComponent
            }, {
                path: 'formulario/:code',
                component: QuestionFormComponent
            }
        ]
    }
];
