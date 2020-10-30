import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {CoreService} from '../../service/core/core.service';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import * as uuid from 'uuid';
import {
    stonyOptions,
    rockinessOptions,
    erosions,
    drainage,
    regionalReliefs, GeneralQuestionsType, SoilProfileOptions
} from '../../../consts/consts.question';
import {LocationService} from '../../service/location/location.service';


@Component({
    selector: 'ms-desifnacao-form',
    templateUrl: './designacao-form.component.html',
    styleUrls: ['./designacao-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DesignacaoFormComponent implements OnInit {
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    codeExamination: any;
    date: string;
    soilProfile: string;
    elevation: string;
    coordinates: string;
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

    horizonlist: [];
    dataSource = new MatTableDataSource<any>(this.horizonlist);
    questionForm: FormGroup;

    soilProfileOptions: any;
    localReliefOptions: any;
    stonyOptions: any;
    rockinessOptions: any;
    generalQuestionsType: any;
    regionalReliefs: any;
    erosions: any;
    drainages: any;


    jsonGeneralQuestionsType = [];


    constructor(public formBuilder: FormBuilder,
                private coreService: CoreService,
                private pageTitleService: PageTitleService,
                private route: ActivatedRoute,
                public router: Router, private locationService: LocationService) {

        this.questionForm = this.formBuilder.group({
            date: [''],
            profile_ground: [''],
            coordinates: [''],
            rochosidade: [''],
            solo_chronology_lithology: [''],
            soil_origin_material: [''],
            pedregosidade: [''],
            level: ['']
        });

        this.soilProfileOptions = SoilProfileOptions;
        this.stonyOptions = stonyOptions;
        this.rockinessOptions = rockinessOptions;
        this.generalQuestionsType = GeneralQuestionsType;
        this.regionalReliefs = regionalReliefs;
        this.erosions = erosions;
        this.drainages = drainage;

    }

    ngOnInit() {
        this.horizonlist = [];
        this.dataSource.paginator = this.paginator;
        this.route.paramMap.subscribe(params => {
            if (params.get('code') !== undefined) {
                this.codeExamination = params.get('code');
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
                        if (jsonGeneralQuestionsType[i].answer.value) {
                            console.log(jsonGeneralQuestionsType[i].answer.value);
                            const temp = jsonGeneralQuestionsType[i].answer.value.split('/');
                            const data = temp[2] + '-' + temp[1] + '-' + temp[0];
                            this.date = data + 'T03:00:00.000Z';
                        }
                        break;
                    }
                    case this.generalQuestionsType.SoilProfile: {
                        this.soilProfile = jsonGeneralQuestionsType[i].answer.value;
                        break;
                    }

                    case this.generalQuestionsType.Elevation: {
                        this.elevation = jsonGeneralQuestionsType[i].answer.value;
                        break;
                    }
                    case this.generalQuestionsType.SlopeSituation: {
                        this.slopeSituation = jsonGeneralQuestionsType[i].answer.value;
                        break;
                    }
                    case this.generalQuestionsType.Lithology: {
                        this.lithology = jsonGeneralQuestionsType[i].answer.value;
                        break;
                    }
                    case this.generalQuestionsType.SourceMaterial: {
                        this.sourceMaterial = jsonGeneralQuestionsType[i].answer.value;
                        break;
                    }
                    case this.generalQuestionsType.Stony: {
                        this.stony = jsonGeneralQuestionsType[i].answer.value;
                        break;
                    }
                    case this.generalQuestionsType.Rockiness: {
                        this.rockiness = jsonGeneralQuestionsType[i].answer.value;
                        break;
                    }
                    case this.generalQuestionsType.LocalRelief: {
                        this.localRelief = jsonGeneralQuestionsType[i].answer.value;
                        break;
                    }
                    case this.generalQuestionsType.RegionalRelief: {
                        this.regionalRelief = jsonGeneralQuestionsType[i].answer.value;
                        break;
                    }
                    case this.generalQuestionsType.Erosion: {
                        this.erosion = jsonGeneralQuestionsType[i].answer.value;
                        break;
                    }
                    case this.generalQuestionsType.Drainage: {
                        this.drainage = jsonGeneralQuestionsType[i].answer.value;
                        break;
                    }
                    case this.generalQuestionsType.Author: {
                        this.author = jsonGeneralQuestionsType[i].answer.value;
                        break;
                    }
                }
            }
        }
    }

    getItem(type: number, value: any) {
        this.jsonGeneralQuestionsType = JSON.parse(localStorage.getItem(this.codeExamination + '-generalQuestionsType'));
        if (this.jsonGeneralQuestionsType === null) {
            this.jsonGeneralQuestionsType = [];
            return undefined;
        }
        for (let i = 0; i < this.jsonGeneralQuestionsType.length; i++) {
            if (type === this.jsonGeneralQuestionsType[i]['type']) {
                this.jsonGeneralQuestionsType[i].answer.value = value;
                this.jsonGeneralQuestionsType[i].creationDate = new Date();
                return this.jsonGeneralQuestionsType;
            }
        }
        return undefined;
    }

    onGeneralQuestionsTypeSave(type: number, name: string) {
        const value = document.getElementById(this.codeExamination + '-' + name)['value'];
        const jsonGeneralQuestionsType = this.getItem(type, value);
        if (jsonGeneralQuestionsType === undefined) {
            this.jsonGeneralQuestionsType.push({
                idRealm: uuid.v4(),
                id: 0,
                name: name,
                type: type,
                creationDate: new Date(),
                answer: {idRealm: uuid.v4(), id: 0, value: value}
            });
        }
        localStorage.setItem(this.codeExamination + '-generalQuestionsType', JSON.stringify(this.jsonGeneralQuestionsType));
    }


    onMaps() {
        this.locationService.getPosition().then(pos => {
            this.openMaps(pos);
        });
    }

    openMaps(pos) {
        const coordenadas = {
            lat: pos.lat,
            lng: pos.lng
        }
        this.coreService.openMaps(coordenadas).subscribe(res => {
                this.responseMaps(res);
            },
            err => console.log(err))
    }


    responseMaps(res
                     :
                     any
    ) {
        this.coordinates = 'lat ' + res.lat + ' lng ' + res.lng;
        // this.onGeneralQuestionsTypeSave(this.generalQuestionsType.Coordinates, 'Coordinates');
    }


}
