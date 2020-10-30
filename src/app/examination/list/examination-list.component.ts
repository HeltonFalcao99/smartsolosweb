import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {CoreService} from '../../service/core/core.service';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as uuid from 'uuid';
import {AuthService} from '../../service/auth-service/auth.service';
import {HorizonService} from '../../service/horizon/horizon.service';
import {ToastrService} from 'ngx-toastr';
import {UtilService} from '../../service/util/util.service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'ms-examination-list',
    templateUrl: './examination-list.component.html',
    styleUrls: ['./examination-list.component.scss']
})
export class ExaminationListComponent implements OnInit {

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    popUpNewExaminationResponse: any;
    popUpEditExaminationResponse: any;
    popUpDeleteExaminationResponse: any;
    examinationlist: any;
    codeProject: any;
    project: any;
    popUpEditProjectResponse: any;
    displayedColumns: string [] = ['name', 'action'];
    dataSource = new MatTableDataSource<any>(this.examinationlist);
    selection = new SelectionModel<any>(true, []);

    constructor(private coreService: CoreService,
                private pageTitleService: PageTitleService,
                private toastr: ToastrService,
                private utilService: UtilService,
                public router: Router, private route: ActivatedRoute,
                private authService: AuthService,
                private horizonService: HorizonService) {
    }

    ngOnInit() {
        this.pageTitleService.setTitle('Exame')
        this.dataSource.paginator = this.paginator;

        this.examinationlist = [];
        this.route.paramMap.subscribe(params => {
            if (params.get('code') !== undefined) {
                this.codeProject = params.get('code');
                this.load();
            }
        });

    }

    load() {
        if (localStorage.getItem(this.codeProject + '-exams') !== null) {
            this.examinationlist = JSON.parse(localStorage.getItem(this.codeProject + '-exams'));
            this.dataSource = new MatTableDataSource<any>(this.examinationlist);
            setTimeout(() => {
                this.dataSource.paginator = this.paginator;
            }, 0);
        }
    }


    getExamination() {
        this.coreService.getExamination(this.codeProject).subscribe(res => {
                this.examinationlist = res
            },
            err => console.log(err),
            () => this.getExaminationList(this.examinationlist)
        );
    }


    getExaminationList(res) {

        if (res.status === 200) {
            this.project = res.data[0];
            console.log(this.project);
            this.examinationlist = res.data[0].exams;
        }
        this.dataSource = new MatTableDataSource<any>(this.examinationlist);
        setTimeout(() => {
            this.dataSource.paginator = this.paginator;
        }, 0)
    }


    /**
     * addNewExaminationDialog method is used to open a add new examination dialog.
     */
    addNewExaminationDialog() {
        // if(this.examinationlist.length < 11){
        this.coreService.addNewExaminationDailog().subscribe(res => {
                this.popUpNewExaminationResponse = res
            },
            err => console.log(err),
            () => this.getAddExaminationPopupResponse(this.popUpNewExaminationResponse))

        // }
    }

    /**
     *getAddExaminationPopupResponse method is used to get a new examination dialog response.
     *if response will be get then add new examination into examination list.
     */
    getAddExaminationPopupResponse(response: any) {
        if (response) {
            const code = uuid.v4();
            const addExamination = {
                idRealm: code,
                codeProject: this.codeProject,
                name: response.examinationName
            };

            this.addExamination(addExamination);
        }
    }


    addExamination(addExamination) {
        this.examinationlist.push(addExamination);
        this.dataSource = new MatTableDataSource<any>(this.examinationlist);
        this.dataSource.paginator = this.paginator;
        localStorage.setItem(this.codeProject + '-exams', JSON.stringify(this.examinationlist));
    }

    /**
     *onDelete method is used to open a delete dialog.
     */
    onDelete(i) {
        this.coreService.deleteDialog(this.examinationlist[i].name).subscribe(res => {
                this.popUpDeleteExaminationResponse = res
            },
            err => console.log(err),
            () => this.getDeleteResponse(this.popUpDeleteExaminationResponse, i))
    }

    /**
     * getDeleteResponse method is used to delete a examination from the examination list.
     */
    getDeleteResponse(response: string, i) {
        if (response === 'yes') {
            // this.dataSource.data.splice(i, 1);
            // this.dataSource = new MatTableDataSource(this.dataSource.data);
        }
    }

    /**
     * onQuestion method is used to open a question form.
     */
    onQuestion(data, index) {
        this.router.navigate(['/pergunta/formulario/', data.idRealm]);
    }

    /**
     * onEdit method is used to open a edit dialog.
     */
    onEdit(data, index) {
        this.coreService.editExaminationList(data).subscribe(res => {
                this.popUpEditExaminationResponse = res
            },
            err => console.log(err),
            () => this.getEditResponse(this.popUpEditExaminationResponse, data, index))
    }

    /**
     * getEditResponse method is used to edit a examination data.
     */
    getEditResponse(response: any, data, i) {
        if (response) {
            const body = {
                name: response.examinationName,
            }
            this.coreService.putExamination(this.examinationlist[i].id, body).subscribe(res => {
                    console.log(res);
                    this.examinationlist[i].name = response.examinationName
                },
                err => console.log(err)
            );
        }

    }


    sendClassification(data, index) {
        this.coreService.sendClassification(data.idRealm).subscribe(res => {
                if (res['status'] === 200) {
                    res['data']['name'] = data.name;
                    this.onClassification(res['data']);
                }
            },
            err => console.log(err));
    }

    onClassification(data) {
        this.coreService.modelClassification(data).subscribe(res => {
            },
            err => console.log(err));
    }


    getItemProject() {
        const currentUser = JSON.parse(localStorage.getItem(environment.token));
        const data = JSON.parse(localStorage.getItem('projects-' + currentUser.id));
        for (let i = 0; i < data.length; i++) {
            if (this.codeProject === data[i].idRealm) {
                return data[i];
            }
        }
        return null;
    }

    onSend() {
        const projects = {'projects': []};
        const data = this.getItemProject();
        data['exams'] = this.horizonService.getExams(this.codeProject);
        for (let i = 0; i < data.exams.length; i++) {
            data.exams[i]['questions'] = this.horizonService.getGeneralQuestionsType(data.exams[i].idRealm);
            data.exams[i]['horizons'] = this.horizonService.getHorizon(data.exams[i].idRealm);
            for (let h = 0; h < data.exams[i]['horizons'].length; h++) {
                data.exams[i]['horizons'][h]['questions'] = [];
                const questions = this.horizonService.getHorizonQuestion(data.exams[i]['horizons'][h].idRealm);
                for (let q = 0; q < questions.length; q++) {
                    if (this.utilService.isObject(questions[q].answer.value)) {
                        questions[q].answer.value = JSON.stringify(questions[q].answer.value);
                    }
                    data.exams[i]['horizons'][h]['questions'].push(questions[q]);
                }
            }
        }
        projects['projects'].push(data);
        this.coreService.sendReponsesSave(projects).subscribe(res => {
                this.popUpEditProjectResponse = res
            },
            err => this.toastr.error('Houve um problema ao comunição com servidor!'),
            () => this.toastr.success('Enviado com sucesso!'));


    }


}
