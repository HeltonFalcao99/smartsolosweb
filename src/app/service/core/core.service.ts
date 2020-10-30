import {Injectable} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {DeleteDialogComponent} from '../../widget-component/pop-up/delete-dialog/delete-dialog.component';
import {AddNewProjectComponent} from '../../widget-component/pop-up/add-new-project/add-new-project.component';
import {AddNewExaminationComponent} from '../../widget-component/pop-up/add-new-examination/add-new-examination.component';
import {EditNewProjectComponent} from '../../widget-component/pop-up/edit-new-project/edit-new-project.component';
import {EditNewExaminationComponent} from '../../widget-component/pop-up/edit-new-examination/edit-new-examination.component';
import {environment} from '../../../environments/environment';
import {MapsComponent} from '../../widget-component/pop-up/maps/maps.component';
import {ClassificationProjectComponent} from '../../widget-component/classification-project/classification-project.component';
import {SyncComponent} from '../../widget-component/pop-up/sync/sync.component';
import {UtilService} from '../util/util.service';

@Injectable({
    providedIn: 'root'
})

export class CoreService {

    collapseSidebar: boolean = false;
    collapseSidebarStatus: boolean;
    sidenavMode: string = 'side';
    sidenavOpen: boolean = true;
    winProject: boolean = false;
    winSinc: boolean = false;
    projectlist: any;

    constructor(private matDialog: MatDialog, private utilService: UtilService,
                private http: HttpClient) {
    }

    // SmartSolos
    syncDailog() {
        let dialogRef: MatDialogRef<SyncComponent>;
        dialogRef = this.matDialog.open(SyncComponent);
        return dialogRef.afterClosed();
    }

    // SmartSolos
    addNewProjectDailog() {
        let dialogRef: MatDialogRef<AddNewProjectComponent>;
        dialogRef = this.matDialog.open(AddNewProjectComponent);
        return dialogRef.afterClosed();
    }


    editProjectList(data) {
        let dialogRef: MatDialogRef<EditNewProjectComponent>;
        dialogRef = this.matDialog.open(EditNewProjectComponent);
        dialogRef.componentInstance.data = data;

        return dialogRef.afterClosed();
    }


    modelClassification(data) {
        let dialogRef: MatDialogRef<ClassificationProjectComponent>;
        dialogRef = this.matDialog.open(ClassificationProjectComponent);
        dialogRef.componentInstance.data = data;
        return dialogRef.afterClosed();
    }


    addNewExaminationDailog() {
        let dialogRef: MatDialogRef<AddNewExaminationComponent>;
        dialogRef = this.matDialog.open(AddNewExaminationComponent);
        return dialogRef.afterClosed();
    }


    editExaminationList(data) {
        let dialogRef: MatDialogRef<EditNewExaminationComponent>;
        dialogRef = this.matDialog.open(EditNewExaminationComponent);
        dialogRef.componentInstance.data = data;

        return dialogRef.afterClosed();
    }


    getExamination(code: any) {
        return this.http.get(environment.apiUrl + 'projects/byIdRealm/' + code).pipe(map(response => response));
    }

    getHorizon(code: any) {
        return this.http.get(environment.apiUrl + 'horizons/code/' + code).pipe(map(response => response));
    }


    postResponse(body: any) {
        return this.http.post(environment.apiUrl + 'responses/custom', body).pipe(map(response => response));
    }

    deleteDialog(data: any) {
        let dialogRef: MatDialogRef<DeleteDialogComponent>;
        dialogRef = this.matDialog.open(DeleteDialogComponent);
        dialogRef.componentInstance.data = data;

        return dialogRef.afterClosed();
    }


    getProjectList() {
        return this.http.get(environment.apiUrl + 'projects/getAll').pipe(map(response => response));
    }

    getUserList() {
        return this.http.get(environment.apiUrl + 'users/getAll').pipe(map(response => response));
    }


    getUser(idUser: any) {
        return this.http.get(environment.apiUrl + 'users/' + idUser).pipe(map(response => response));
    }


    addHorizon(body: any) {
        return this.http.post(environment.apiUrl + 'horizons', body).pipe(map(response => response));
    }

    postExamination(body: any) {

        return this.http.post(environment.apiUrl + 'examinations', body).pipe(map(response => response));
    }

    postProject(body: any) {

        return this.http.post(environment.apiUrl + 'projects', body).pipe(map(response => response));
    }


    putProject(id: any, body: any) {

        return this.http.put(environment.apiUrl + 'projects/' + id, body).pipe(map(response => response));
    }

    putExamination(id: any, body: any) {
        return this.http.put(environment.apiUrl + 'examinations/' + id, body).pipe(map(response => response));
    }

    putUser(body: any, id: any) {
        return this.http.put(environment.apiUrl + 'users/' + id, body).pipe(map(response => response));
    }

    postUser(body: any) {
        return this.http.post(environment.apiUrl + 'users', body).pipe(map(response => response));
    }


    getProfileList() {
        return this.http.get(environment.apiUrl + 'profiles/list').pipe(map(response => response));
    }

    sendReponsesSave(body: any) {
        return this.http.post(environment.apiUrl + 'responses/save', body).pipe(map(response => response));
    }

    getAll() {
        return this.http.get(environment.apiUrl + 'projects/getAll').pipe(map(response => response));
    }

    deleteExams(code: any) {
        return this.http.get(environment.apiUrl + 'examinations/idRealm/' + code).pipe(map(response => response));
    }

    sendClassification(code: any) {
        return this.http.get(environment.apiUrl + 'examinations/send/' + code).pipe(map(response => response));
    }

    openMaps(data) {
        let dialogRef: MatDialogRef<MapsComponent>;
        dialogRef = this.matDialog.open(MapsComponent);
        dialogRef.componentInstance.data = data;
        return dialogRef.afterClosed();
    }

    processar(dataResponse) {
        this.projectlist = [];
        if (dataResponse['status'] === 200) {
            const currentUser = JSON.parse(localStorage.getItem(environment.token));
            localStorage.setItem('projects-' + currentUser.id, JSON.stringify([]));
            this.projectlist = [];
            const projects = dataResponse['data'];
            for (let i = 0; i < projects.length; i++) {
                const addProject = {
                    idRealm: projects[i].idRealm,
                    id: projects[i].id,
                    name: projects[i].name,
                    creationDate: projects[i].creationDate
                };
                this.projectlist.push(addProject);
                const tempExams = [];
                for (let j = 0; j < projects[i]['exams'].length; j++) {
                    const exam = projects[i]['exams'][j];
                    const addExamination = {
                        idRealm: exam.idRealm,
                        name: exam.name,
                        creationDate: exam.creationDate
                    };
                    tempExams.push(addExamination);
                    const tempQuestions = [];
                    for (let q = 0; q < exam['questions'].length; q++) {
                        const question = exam['questions'][q];
                        const addQuestion = {
                            idRealm: question.idRealm,
                            id: question.id,
                            name: question.name,
                            type: question.type,
                            creationDate: question.creationDate,
                            answer: {
                                idRealm: question.answer.idRealm,
                                id: question.answer.id,
                                value: question.answer.value,
                            }
                        };
                        tempQuestions.push(addQuestion);
                    }
                    localStorage.setItem(exam.idRealm + '-generalQuestionsType', JSON.stringify(tempQuestions));
                    const tempHorizons = [];
                    for (let h = 0; h < exam['horizons'].length; h++) {
                        const horizon = exam['horizons'][h];
                        const addHorizon = {
                            idRealm: horizon.idRealm,
                            id: horizon.id,
                            name: horizon.name,
                            creationDate: horizon.creationDate
                        };
                        tempHorizons.push(addHorizon);

                        const tempHorizonQuestions = [];
                        for (let hq = 0; hq < horizon['questions'].length; hq++) {
                            const horizonQuestion = horizon['questions'][hq];
                            horizonQuestion.answer.value = this.utilService.stringToObject(horizonQuestion);
                            const addHorizonQuestion = {
                                idRealm: horizonQuestion.idRealm,
                                id: horizonQuestion.id,
                                name: horizonQuestion.name,
                                type: horizonQuestion.type,
                                creationDate: horizon.creationDate,
                                answer: {
                                    idRealm: horizonQuestion.answer.idRealm,
                                    id: horizonQuestion.answer.id,
                                    value: horizonQuestion.answer.value,
                                }
                            };

                            tempHorizonQuestions.push(addHorizonQuestion)
                        }
                        localStorage.setItem(horizon.idRealm, JSON.stringify(tempHorizonQuestions));
                    }
                    localStorage.setItem(exam.idRealm + '-horizon', JSON.stringify(tempHorizons));
                }
                localStorage.setItem(projects[i].idRealm + '-exams', JSON.stringify(tempExams));
            }
            localStorage.setItem('projects-' + currentUser.id, JSON.stringify(this.projectlist));
            this.loadProject();

        }

    }

    loadProject() {
        this.projectlist = [];
        const currentUser = JSON.parse(localStorage.getItem(environment.token));
        if (localStorage.getItem('projects-' + currentUser.id) !== null) {
            const tempProjectlist = JSON.parse(localStorage.getItem('projects-' + currentUser.id));
            for (let x = 0; x < tempProjectlist.length; x++) {
                const codeProject = tempProjectlist[x].idRealm;
                tempProjectlist[x].exams = [];
                if (localStorage.getItem(codeProject + '-exams') !== null) {
                    const tempExams = JSON.parse(localStorage.getItem(codeProject + '-exams'));
                    for (let j = 0; j < tempExams.length; j++) {
                        tempProjectlist[x].exams.push(tempExams[j]);
                    }
                }
                this.projectlist.push(tempProjectlist[x]);
            }
        }
    }


}
