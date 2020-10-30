import {Component, OnInit} from '@angular/core';
import {CoreService} from '../service/core/core.service';
import {PageTitleService} from '../core/page-title/page-title.service';
import {ActivatedRoute} from '@angular/router';

import {ToastrService} from 'ngx-toastr';
import {HorizonsQuestionsType} from "../../consts/consts.question";

@Component({
    selector: 'ms-horizon-designation',
    templateUrl: './horizon-designation.component.html',
    styleUrls: ['./horizon-designation.component.scss']
})
export class HorizonDesignationComponent implements OnInit {

    public horizonColorlist = [];
    public horizonDesignationlist = [];
    public superiorLimitlist = [];
    public inferiorLimitlist = [];
    public texturelist = [];
    public thicknesslist = [];
    public curlinglist = [];
    public codeExamination: any;
    private horizonsQuestionsType: any;

    public horizonslist = [];

    constructor(private coreService: CoreService,
                private pageTitleService: PageTitleService,
                private toastr: ToastrService,
                private route: ActivatedRoute) {
        this.coreService.winProject = false;
        this.coreService.winSinc = false;

        this.horizonsQuestionsType = HorizonsQuestionsType;
    }

    ngOnInit() {
        this.pageTitleService.setTitle('Horizonte(s)');
        this.route.paramMap.subscribe(params => {
            if (params.get('code') !== undefined) {
                this.codeExamination = params.get('code');
                console.log(this.codeExamination);
                // console.log(localStorage.getItem(this.codeExamination + '-horizon'));
                this.horizonslist = JSON.parse(localStorage.getItem(this.codeExamination + '-horizon'));
                this.addHorizon();
                // this.getHorizon();
            }
        });


    }


    getHorizon() {
        this.coreService.getHorizon(this.codeExamination).subscribe(res => {
                if (res['status'] === 200) {

                    this.addHorizon();

                }
            },
            err => this.addHorizon()
        );
    }

    addHorizon() {
        this.horizonslist.forEach((item, i) => {
            const tempHorizonDesignation = Object.assign({}, item);
            // let tempHorizonColor = Object.assign({}, item);
            // let tempSuperiorLimit = Object.assign({}, item);
            // let tempInferiorLimit = Object.assign({}, item);
            // let tempCurling = Object.assign({}, item);
            // let tempThicknesslist = Object.assign({}, item);
            // let tempTexturelist = Object.assign({}, item);


            this.horizonDesignationlist.push(tempHorizonDesignation);
            // this.horizonColorlist.push(tempHorizonColor);
            // this.superiorLimitlist.push(tempSuperiorLimit);
            // this.inferiorLimitlist.push(tempInferiorLimit);
            // this.thicknesslist.push(tempThicknesslist);
            // this.curlinglist.push(tempCurling);
            // this.texturelist.push(tempTexturelist);
        });
        console.log(JSON.stringify(this.horizonDesignationlist));

        localStorage.setItem(this.codeExamination + '-horizonDesignation', JSON.stringify(this.horizonDesignationlist));

    }

    getHorizonDesignation() {
        const objs: any = JSON.parse(localStorage.getItem(this.codeExamination + '-horizonDesignation'));
        for (let i = 0; i < objs.length; i++) {
            if (objs[i].idRealm === objs.idRealm) {

                break;
            }
        }
        localStorage.setItem(this.codeExamination + '-horizonDesignation', JSON.stringify(objs));
    }


    renameHorizon() {
        // const data = JSON.parse(localStorage.getItem(this.codeExamination + '-horizon'));
    }


    onHorizonsColor() {
        // this.toastr.success('Successfully Signed Up!');
        // this.toastr.error('teste!!!!');

        const tempHorizonColor = [];
        this.horizonColorlist.forEach((item, i) => {
            const matriz = (item['matriz'] !== undefined) ? item['matriz'] : '';
            const valor = (item['valor'] !== undefined) ? item['valor'] : '';
            const croma = (item['croma'] !== undefined) ? item['croma'] : '';
            tempHorizonColor.push({
                'idQuestion': this.horizonsQuestionsType.Color.id,
                'matriz': matriz,
                'valor': valor,
                'croma': croma,
                'horizon': item['code']
            });


        });
        localStorage.setItem(this.codeExamination + '-horizonColor', JSON.stringify(tempHorizonColor));

    }

    onHorizonDesignation() {
        const tempHorizonDesignation = [];
        this.horizonDesignationlist.forEach((item, i) => {
            const date = new Date();
            const value = (item['value'] !== undefined) ? item['value'] : '';
            tempHorizonDesignation.push({
                'type': this.horizonsQuestionsType.HorizonDesignation.id,
                'name': value,
                'idRealm': item['idRealm'],
                'creationDate': date
            });
            this.horizonDesignationlist[i].name = value;
        });
        localStorage.setItem(this.codeExamination + '-horizonDesignation', JSON.stringify(tempHorizonDesignation));
    }

    onSuperiorLimit() {

        const tempSuperiorLimit = [];
        this.horizonDesignationlist.forEach((item, i) => {
            const value = (item['value'] !== undefined) ? item['value'] : '';
            tempSuperiorLimit.push({
                'idQuestion': this.horizonsQuestionsType.SuperiorLimit.id,
                'value': value,
                'horizon': item['code']
            });
        });
        localStorage.setItem(this.codeExamination + '-superiorLimit', JSON.stringify(tempSuperiorLimit));

    }

    onInferiorLimit() {
        const tempInferiorLimit = [];
        this.inferiorLimitlist.forEach((item, i) => {
            const value = (item['value'] !== undefined) ? item['value'] : '';
            tempInferiorLimit.push({
                'idQuestion': this.horizonsQuestionsType.InferiorLimit.id,
                'value': value,
                'horizon': item['code']
            });
            if (this.superiorLimitlist[i + 1] !== undefined) {
                this.superiorLimitlist[i + 1]['value'] = value;
            }
        });
        localStorage.setItem(this.codeExamination + '-superiorLimit', JSON.stringify(this.superiorLimitlist));
        localStorage.setItem(this.codeExamination + '-inferiorLimit', JSON.stringify(tempInferiorLimit));


    }

    onCurling() {
        const tempCurling = [];
        this.curlinglist.forEach((item, i) => {
            const value = (item['value'] !== undefined) ? item['value'] : '';
            tempCurling.push({
                'idQuestion': this.horizonsQuestionsType.Curling.id,
                'value': value,
                'horizon': item['code']
            });


        });
        localStorage.setItem(this.codeExamination + '-curling', JSON.stringify(tempCurling));

    }


}
