import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {CoreService} from '../../service/core/core.service';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {Router} from '@angular/router';
import * as uuid from 'uuid';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {HorizonService} from '../../service/horizon/horizon.service';
import {UtilService} from '../../service/util/util.service';

@Component({
    selector: 'ms-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
    popUpDeleteExaminationResponse: any;
    popUpEditExaminationResponse: any;
    popUpEditProjectResponse: any;
    projectlist: any;
    popUpNewExaminationResponse: any;
    selection = new SelectionModel<any>(true, []);

    constructor(private coreService: CoreService,
                private toastr: ToastrService,
                private utilService: UtilService,
                private horizonService: HorizonService,
                private pageTitleService: PageTitleService,
                public router: Router) {
        this.coreService.winProject = true;
        this.coreService.winSinc = true;
    }

    ngOnInit() {
        this.pageTitleService.setTitle('Projetos')
        this.coreService.loadProject();
    }


    getProjects() {
        return this.coreService.projectlist;
    }


    /**
     *onDelete method is used to open a delete dialog.
     */
    onDelete(project, exam) {
        const data = {
            titulo: 'Remover Exame (' + exam.name + ')',
            conteudo: 'Tem certeza que deseja remover o exame?'
        };

        this.coreService.deleteDialog(data).subscribe(res => {
                this.popUpDeleteExaminationResponse = res
            },
            err => this.toastr.error('Houve um problema ao comunição com servidor!'),
            () => this.getDeleteResponse(this.popUpDeleteExaminationResponse, project, exam))
    }

    /**
     * getDeleteResponse method is used to delete a examination from the examination list.
     */
    getDeleteResponse(response: string, project: any, exam: any) {
        if (response === 'yes') {
            const key = exam.codeProject + '-exams';
            const examinationlist = JSON.parse(localStorage.getItem(key));
            console.log(exam);
            const temp = [];
            for (let i = 0; i < examinationlist.length; i++) {
                if (exam.idRealm !== examinationlist[i].idRealm) {
                    temp.push(examinationlist[i]);
                }
            }
            localStorage.setItem(key, JSON.stringify(temp));
            this.coreService.loadProject();
            // const temp = [];
            // for (let i = 0; i < this.coreService.projectlist.length; i++) {
            //     const p = {
            //         id: this.coreService.projectlist[i].id,
            //         creationDate: this.coreService.projectlist[i].creationDate,
            //         idRealm: this.coreService.projectlist[i].idRealm,
            //         name: this.coreService.projectlist[i].name,
            //         exams: []
            //     };
            //     const exams = this.coreService.projectlist[i].exams;
            //     if (exams !== undefined) {
            //         for (let j = 0; j < exams.length; j++) {
            //             if (exam.idRealm !== exams[j].idRealm) {
            //                 p.exams.push(exams[j]);
            //             }
            //         }
            //     }
            //     temp.push(p);
            // }
            // const currentUser = JSON.parse(localStorage.getItem(environment.token));
            // localStorage.setItem('projects-' + currentUser.id, JSON.stringify(temp));
            // this.coreService.loadProject();
        }
    }

    /**
     * onQuestion method is used to open a question form.
     */
    onQuestion(data) {
        this.router.navigate(['/pergunta/formulario/', data.idRealm]);
    }

    /**
     * onEdit method is used to open a edit dialog.
     */
    onEditExams(data) {
        // console.log(data);
        this.coreService.editExaminationList(data).subscribe(res => {
                this.popUpEditExaminationResponse = res
            },
            err => this.toastr.error('Houve um problema ao comunição com servidor!'),
            () => this.getEditExamsResponse(this.popUpEditExaminationResponse, data))
    }


    /**
     * getEditResponse method is used to edit a examination data.
     */
    getEditExamsResponse(response: any, data) {
        if (response) {
            const addExams = [];
            const key = data.codeProject + '-exams';
            const examinationlist = JSON.parse(localStorage.getItem(key));
            for (let i = 0; i < examinationlist.length; i++) {
                if (examinationlist[i].idRealm === data.idRealm) {
                    data.name = response.examinationName;
                    examinationlist[i].name = response.examinationName;
                }
                addExams.push(examinationlist[i]);
            }
            localStorage.setItem(key, JSON.stringify(addExams));
        }

    }

    sendClassification(data) {
        this.coreService.sendClassification(data.idRealm).subscribe(res => {
                if (res['status'] === 200) {
                    res['data']['name'] = data.name;
                    this.onClassification(res['data']);
                }
            },
            err => this.toastr.error('Houve um problema ao comunição com servidor!'));
    }

    onClassification(data) {
        this.coreService.modelClassification(data).subscribe(res => {
            },
            err => this.toastr.error('Houve um problema ao comunição com servidor!'));
    }

    onSend(project, exam) {

        const projects = {'projects': []};
        const data = {
            id: project.id,
            idRealm: project.idRealm,
            name: project.name,
            creationDate: project.creationDate,
            exams: []
        };
        data['exams'].push(exam);
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


    /**
     * addNewProjectDialog method is used to open a add new project dialog.
     */
    // addNewProjectDialog() {
    //
    //
    //     this.coreService.addNewProjectDailog().subscribe(res => {
    //             this.popUpNewProjectResponse = res
    //         },
    //         err => console.log(err),
    //         () => this.getAddProjectPopupResponse(this.popUpNewProjectResponse))
    // }

    /**
     *getAddProjectPopupResponse method is used to get a new project dialog response.
     *if response will be get then add new project into project list.
     */
    // getAddProjectPopupResponse(response: any) {
    //     if (response) {
    //         const code = uuid.v4();
    //         const addProject = {
    //             idRealm: code,
    //             name: response.projectName,
    //             id: 0,
    //             creationDate: new Date()
    //         };
    //         this.addProject(addProject);
    //     }
    // }

    // notifyTable() {
    //     this.dataSource = new MatTableDataSource<any>(this.projectlist);
    //     this.dataSource.paginator = this.paginator;
    //     const currentUser = JSON.parse(localStorage.getItem(environment.token));
    //     localStorage.setItem('projects-' + currentUser.id, JSON.stringify(this.projectlist));
    // }

    // addProject(addProject) {
    //     this.projectlist.push(addProject);
    //     this.notifyTable();
    // }


    /**
     * addNewExaminationDialog method is used to open a add new examination dialog.
     */
    addNewExaminationDialog(p: any) {
        this.coreService.addNewExaminationDailog().subscribe(res => {
                this.popUpNewExaminationResponse = res
            },
            err => this.toastr.error('Houve um problema ao comunição com servidor!'),
            () => this.getAddExaminationPopupResponse(this.popUpNewExaminationResponse, p))

    }

    /**
     *getAddExaminationPopupResponse method is used to get a new examination dialog response.
     *if response will be get then add new examination into examination list.
     */
    getAddExaminationPopupResponse(response: any, p: any) {
        if (response) {
            const code = uuid.v4();
            const addExamination = {
                idRealm: code,
                codeProject: p.idRealm,
                name: response.examinationName
            };
            console.log(addExamination);
            this.addExam(addExamination);
        }
    }

    addExam(addExamination: any) {
        const key = addExamination.codeProject + '-exams';
        const examinationlist = localStorage.getItem(key) === null ? [] : JSON.parse(localStorage.getItem(key));
        examinationlist.push(addExamination);
        localStorage.setItem(key, JSON.stringify(examinationlist));
        this.coreService.loadProject();
    }


    /**
     * onEdit method is used to open a edit dialog.
     */
    onEdit(data, index) {
        this.coreService.editProjectList(data).subscribe(res => {
                this.popUpEditProjectResponse = res
            },
            err => console.log(err),
            () => this.getEditResponse(this.popUpEditProjectResponse, data, index));
    }


    /**
     * getEditResponse method is used to edit a project data.
     */
    getEditResponse(response: any, data, i) {
        if (response) {
            const project = {
                name: response.projectName,
            }
            this.coreService.putProject(this.projectlist[i].id, project).subscribe(res => {
                    this.projectlist[i].name = response.projectName
                },
                err => console.log(err)
            );
        }
    }
}
