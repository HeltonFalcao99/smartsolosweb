import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {CoreService} from '../../service/core/core.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as uuid from 'uuid';
import {
    SoilProfileOptions,
    stonyOptions,
    rockinessOptions,
    LocalReliefOptions,
    erosions,
    drainage,
    regionalReliefs,
    GeneralQuestionsType
} from '../../../consts/consts.question';
import {ToastrService} from 'ngx-toastr';
import {HorizonService} from '../../service/horizon/horizon.service';


@Component({
    selector: 'ms-question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class QuestionFormComponent implements OnInit {
    codeExamination: any;
    date: string;
    soilProfile: string;
    elevation: string;
    slopeSituation: string;
    lithology: string;
    sourceMaterial: string;
    rockiness: string;
    localRelief: string;
    regionalRelief: string;
    drainage: string;
    author: string;
    erosion: string;
    stony: string;
    popupDeleteResponse: any;

    horizonlist: any;

    soilProfileOptions: any;
    localReliefOptions: any;
    stonyOptions: any;
    rockinessOptions: any;
    generalQuestionsType: any;
    regionalReliefs: any;
    erosions: any;
    drainages: any;

    constructor(public formBuilder: FormBuilder,
                private coreService: CoreService,
                private pageTitleService: PageTitleService,
                private route: ActivatedRoute,
                private toastr: ToastrService,
                public router: Router, private horizonService: HorizonService) {
        this.coreService.winProject = false;
        this.coreService.winSinc = false;


        this.soilProfileOptions = SoilProfileOptions;
        this.localReliefOptions = LocalReliefOptions;
        this.stonyOptions = stonyOptions;
        this.rockinessOptions = rockinessOptions;
        this.generalQuestionsType = GeneralQuestionsType;
        this.regionalReliefs = regionalReliefs;
        this.erosions = erosions;
        this.drainages = drainage;


    }

    ngOnInit() {
        this.pageTitleService.setTitle('Análise Morfológica');
        this.horizonlist = [];
        this.route.paramMap.subscribe(params => {
            if (params.get('code') !== undefined) {
                this.codeExamination = params.get('code');
                this.localStorageHorizon();
                this.onGeneralQuestionsTypeStorage();
            }
        });

    }


    onGeneralQuestionsTypeStorage() {

        const jsonGeneralQuestionsType = JSON.parse(localStorage.getItem(this.codeExamination + '-generalQuestionsType'));
        if (jsonGeneralQuestionsType) {
            for (let i = 0; i < jsonGeneralQuestionsType.length; i++) {
                switch (jsonGeneralQuestionsType[i].type) {
                    case this.generalQuestionsType.Date: {
                        if (jsonGeneralQuestionsType[i].value) {
                            const temp = jsonGeneralQuestionsType[i].value.split('/');
                            const data = temp[2] + '-' + temp[1] + '-' + temp[0];
                            this.date = data + 'T03:00:00.000Z';
                        }
                        break;
                    }
                    case this.generalQuestionsType.SoilProfile: {
                        this.soilProfile = jsonGeneralQuestionsType[i].value;
                        break;
                    }

                    case this.generalQuestionsType.Elevation: {
                        this.elevation = jsonGeneralQuestionsType[i].value;
                        break;
                    }
                    case this.generalQuestionsType.SlopeSituation: {
                        this.slopeSituation = jsonGeneralQuestionsType[i].value;
                        break;
                    }
                    case this.generalQuestionsType.Lithology: {
                        this.lithology = jsonGeneralQuestionsType[i].value;
                        break;
                    }
                    case this.generalQuestionsType.SourceMaterial: {
                        this.sourceMaterial = jsonGeneralQuestionsType[i].value;
                        break;
                    }
                    case this.generalQuestionsType.Stony: {
                        this.stony = jsonGeneralQuestionsType[i].value;
                        break;
                    }
                    case this.generalQuestionsType.Rockiness: {
                        this.rockiness = jsonGeneralQuestionsType[i].value;
                        break;
                    }
                    case this.generalQuestionsType.LocalRelief: {
                        this.localRelief = jsonGeneralQuestionsType[i].value;
                        break;
                    }
                    case this.generalQuestionsType.RegionalRelief: {
                        this.regionalRelief = jsonGeneralQuestionsType[i].value;
                        break;
                    }
                    case this.generalQuestionsType.Erosion: {
                        this.erosion = jsonGeneralQuestionsType[i].value;
                        break;
                    }
                    case this.generalQuestionsType.Drainage: {
                        this.drainage = jsonGeneralQuestionsType[i].value;
                        break;
                    }
                    case this.generalQuestionsType.Author: {
                        this.author = jsonGeneralQuestionsType[i].value;
                        break;
                    }
                }
            }
        }
    }


    addNewHorizon(ant: number) {
        const quantidade = this.horizonlist.length + 1;
        if (quantidade <= 10) {
            const code = uuid.v4();
            let superiorLimit = true;
            let inferiorLimit: boolean;
            if (ant === -1) {
                inferiorLimit = false;
            } else {
                this.horizonlist[ant].superiorLimit = false;
                this.horizonlist[ant].inferiorLimit = true;
                superiorLimit = false;
                inferiorLimit = false;
            }
            const addHorizon = {
                idRealm: code,
                id: 0,
                name: 'Horizonte ' + quantidade,
                creationDate: new Date(),
                SuperiorLimit: superiorLimit,
                InferiorLimit: inferiorLimit
            }
            this.horizonlist.push(addHorizon);
            this.horizonService.setLocalStorage(this.codeExamination, this.horizonlist);
        } else {
            this.toastr.info('Número máximo de horizontes já foi alcançado');
        }

    }

    localStorageHorizon() {
        if (JSON.parse(localStorage.getItem(this.codeExamination + '-horizon')) !== null) {
            this.horizonlist = JSON.parse(localStorage.getItem(this.codeExamination + '-horizon'));
        }
    }

    addNewHorizonForm() {
        this.router.navigate(['/horizonte/formulario', this.codeExamination])
    }


    /**
     *onDelete method is used to open a delete dialog.
     */
    onDelete(horizon) {
        const data = {
            titulo: 'Remover Horizonte (' + horizon['name'] + ')',
            conteudo: 'Tem certeza que deseja remover o horizonte?'
        };

        this.coreService.deleteDialog(data).subscribe(res => {
                this.popupDeleteResponse = res
            },
            err => console.log(err),
            () => this.getPopupDeleteResponse(this.popupDeleteResponse, horizon))
    }


    /**
     * getPopupDeleteResponse is used to delete the cart item when reponse is yes.
     */
    getPopupDeleteResponse(response: any, horizon) {
        console.log(horizon);
        if (response === 'yes') {
            this.horizonService.delete(horizon, this.codeExamination);
            this.localStorageHorizon();
        }
    }


    responseMaps(res: any) {
        console.log(res);
    }

    /**
     * onQuestion method is used to open a question form.
     */
    onBack() {
        this.router.navigate(['/projeto/lista']);
    }


}
