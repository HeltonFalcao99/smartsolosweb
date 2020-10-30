import {Component, OnInit} from '@angular/core';
import {CoreService} from '../../service/core/core.service';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as uuid from 'uuid';
import {ToastrService} from 'ngx-toastr';
import {HorizonsQuestionsType} from '../../../consts/consts.question';
import {FisicsQuestionsType} from '../../../consts/consts.fisica';
import {ChemistryQuestionsType} from '../../../consts/consts.quimica';
import {UtilService} from '../../service/util/util.service';
import {AutomaticCalculation} from '../../../consts/consts.autoCalc';

@Component({
    selector: 'ms-horizon-list',
    templateUrl: './horizon-list.component.html',
    styleUrls: ['./horizon-list.component.scss']
})
export class HorizonListComponent implements OnInit {

    public horizonsQuestionsTypes = [];
    public codeExamination: any;
    private fisicsQuestionsType: any;
    private chemistryQuestionsType: any;
    public horizonslist = [];

    constructor(private coreService: CoreService,
                private pageTitleService: PageTitleService,
                private toastr: ToastrService, private utilService: UtilService,
                private router: Router,
                private route: ActivatedRoute) {
        this.coreService.winProject = false;
        this.coreService.winSinc = false;

    }

    ngOnInit() {
        this.pageTitleService.setTitle('Horizonte(s)');
        this.route.paramMap.subscribe(params => {
            if (params.get('code') !== undefined) {
                this.codeExamination = params.get('code');
                this.horizonslist = JSON.parse(localStorage.getItem(this.codeExamination + '-horizon'));
                this.horizonsQuestionsTypes = this.processar(HorizonsQuestionsType);
                this.fisicsQuestionsType = this.processar(FisicsQuestionsType);
                this.chemistryQuestionsType = this.processar(ChemistryQuestionsType);
            }
        });
    }

    processar(data) {
        const objs = Object['values'](data);
        for (let i = 0; i < objs.length; i++) {
            objs[i] = objs[i];
            objs[i].values = [];
            if (objs[i].editable === undefined) {
                objs[i].editable = true;
            }
            for (let x = 0; x < this.horizonslist.length; x++) {
                const obj = this.getHorizons(objs[i].type, this.horizonslist[x].idRealm);
                if (obj !== undefined) {
                    objs[i].values[this.horizonslist[x].idRealm] = obj;
                } else {
                    const value = objs[i].default !== undefined ? objs[i].default : '';
                    objs[i].values[this.horizonslist[x].idRealm] = {
                        type: objs[i].type,
                        id: 0,
                        name: objs[i].name,
                        idRealm: this.horizonslist[x].idRealm,
                        creationDate: new Date(),
                        answer: {idRealm: uuid.v4(), id: 0, value: value}
                    };
                }
            }
        }
        return objs;
    }

    prepareValue(name, idRealm, sub) {
        let v: any;
        if (sub === undefined) {
            v = document.getElementById(name + ' ' + idRealm)['value'];
        } else {
            v = document.getElementById(name + ' ' + idRealm + ' ' + sub)['value'];
        }

        return v;
    }


    prepareCadResult(horizonType, v, sub) {
        let values: any;
        if (horizonType.inputType === 8) {
            values = {value: v, ondulado: false, max: '', min: ''};
            values[sub] = v;
        } else if (horizonType.inputType === 4) {
            values = {
                matiz: '',
                value: '',
                croma: '',
                mosMatiz: '',
                mosMValue: '',
                mosCroma: '',
                mosMatiz_1: '',
                mosMValue_1: '',
                mosCroma_1: '',
                varMatiz_1: '',
                varMValue_1: '',
                varCroma_1: '',
                varMatiz_2: '',
                varMValue_2: '',
                varCroma_2: '',
                mosqueado: false,
                variegado: false
            };
            values[sub] = v;
        } else {
            values = v;
        }
        return values;
    }

    onHorizon(horizon, horizonType, sub) {
        let tempHorizons = [];
        if (localStorage.getItem(horizon.idRealm)) {
            tempHorizons = JSON.parse(localStorage.getItem(horizon.idRealm));
        }
        const v = this.prepareValue(horizonType.name, horizon.idRealm, sub);
        let modoEdicao = false;
        for (let i = 0; i < tempHorizons.length; i++) {
            if (tempHorizons[i].type === horizonType.type) {
                if (horizonType.inputType === 8) {
                    tempHorizons[i].answer.value[sub] = v;
                } else if (horizonType.inputType === 4) {
                    tempHorizons[i].answer.value[sub] = v;
                } else {
                    tempHorizons[i].answer.value = v;
                }
                modoEdicao = true;
                break;
            }
        }

        if (!modoEdicao) {
            const values = this.prepareCadResult(horizonType, v, sub);
            tempHorizons.push({
                type: horizonType.type,
                id: 0,
                name: horizonType.name,
                idRealm: uuid.v4(),
                creationDate: new Date(),
                answer: {idRealm: uuid.v4(), id: 0, value: values}
            });
        }
        localStorage.setItem(horizon.idRealm, JSON.stringify(tempHorizons));
        this.doTypeLogicAfterSave(horizon, horizonType, v, sub);
        if (horizonType.name === 'horizonDesignation') {
            this.renameHorizon(horizon.idRealm, v);
        }
    }


    onMosqueadoVariegado($event, horizonType, horizon, sub) {
        let tempHorizons = [];
        if (localStorage.getItem(horizon.idRealm)) {
            tempHorizons = JSON.parse(localStorage.getItem(horizon.idRealm));
        }
        let modoEdicao = false;
        for (let i = 0; i < tempHorizons.length; i++) {
            if (tempHorizons[i].type === horizonType.type) {
                tempHorizons[i].answer.value[sub] = $event.checked;
                modoEdicao = true;
                break;
            }
        }
        if (!modoEdicao) {
            const values = this.prepareCadResult(horizonType, $event.checked, sub);
            tempHorizons.push({
                type: horizonType.type,
                id: 0,
                name: name,
                idRealm: uuid.v4(),
                creationDate: new Date(),
                answer: {idRealm: uuid.v4(), id: 0, value: values}
            });
        }
        localStorage.setItem(horizon.idRealm, JSON.stringify(tempHorizons));
        // if (horizonType.type === 18) {
        this.doTypeLogicAfterSave(horizon, horizonType, $event.checked, sub);
        // }
        this.horizonsQuestionsTypes = this.processar(HorizonsQuestionsType);
    }

    setInferiorLimitValue(horizon, v, sub) {
        for (let j = 0; j < this.horizonslist.length; j++) {
            if (this.horizonslist[j].idRealm === horizon.idRealm) {
                const tempHorizon = this.horizonslist[j - 1];
                const horizonType = HorizonsQuestionsType.InferiorLimit;
                let tempHorizons = [];
                if (localStorage.getItem(horizon.idRealm)) {
                    tempHorizons = JSON.parse(localStorage.getItem(tempHorizon.idRealm));
                }
                let modoEdicao = false;
                for (let i = 0; i < tempHorizons.length; i++) {
                    if (tempHorizons[i].type === horizonType.type) {
                        tempHorizons[i].answer.value[sub] = v;
                        console.log(tempHorizons[i]);
                        modoEdicao = true;
                        break;
                    }
                }

                if (!modoEdicao) {
                    const values = this.prepareCadResult(horizonType, v, sub);
                    console.log(values);
                    tempHorizons.push({
                        type: horizonType.type,
                        id: 0,
                        name: horizonType.name,
                        idRealm: uuid.v4(),
                        creationDate: new Date(),
                        answer: {idRealm: uuid.v4(), id: 0, value: values}
                    });
                }
                localStorage.setItem(tempHorizon.idRealm, JSON.stringify(tempHorizons));
                this.horizonsQuestionsTypes = this.processar(HorizonsQuestionsType);
                break;
            }
        }


    }

    // Executa os calculos depois de salvar.
    doTypeLogicAfterSave(horizon, horizonType, value, sub) {
        const type = horizonType.type;
        switch (type) {
            case HorizonsQuestionsType.HorizonDesignation.type:
                // const color = await this.getHorizonColor();
                // KeyObserver.instance.notify(this.props.horizonIndex, { label: value, color: color });
                break;
            case HorizonsQuestionsType.InferiorLimit.type:
                this.doAutomaticCalculation([AutomaticCalculation.Thickness], horizon.idRealm);
                break;
            case HorizonsQuestionsType.SuperiorLimit.type:
                this.setInferiorLimitValue(horizon, value, sub);
                this.doAutomaticCalculation([AutomaticCalculation.Thickness], horizon.idRealm);
                break;
            case FisicsQuestionsType.ArgilaDispersaAgua.type:
                this.doAutomaticCalculation([AutomaticCalculation.GrauFloculacao], horizon.idRealm);
                break;
            case FisicsQuestionsType.Silte.type:
                this.doAutomaticCalculation([AutomaticCalculation.SilteArgila], horizon.idRealm);
                break;
            case FisicsQuestionsType.ArgilaDispersaAgua.type:
                this.doAutomaticCalculation([AutomaticCalculation.GrauFloculacao], horizon.idRealm);
                break;
            case FisicsQuestionsType.DensidadeParticulas.type:
            case FisicsQuestionsType.DensidadeSolo.type:
                this.doAutomaticCalculation([AutomaticCalculation.PorosidadeTotal], horizon.idRealm);
                break;
            case ChemistryQuestionsType.C.type:
            case ChemistryQuestionsType.N.type:
                this.doAutomaticCalculation([AutomaticCalculation.RelacaoCN], horizon.idRealm);
                break;
            case ChemistryQuestionsType.ComplexoSortidoK.type:
            case ChemistryQuestionsType.ComplexoSortidoCA.type:
            case ChemistryQuestionsType.ComplexoSortidoMG.type:
                this.doAutomaticCalculation([AutomaticCalculation.ComplexoSortidoS], horizon.idRealm);
                break;
            case ChemistryQuestionsType.ComplexoSortidoNa.type:
                this.doAutomaticCalculation([AutomaticCalculation.ComplexoSortidoS, AutomaticCalculation.SaturacaoSodio], horizon.idRealm);
                break;
            case ChemistryQuestionsType.ComplexoSortidoS.type:
                this.doAutomaticCalculation([AutomaticCalculation.ComplexoSortidoT, AutomaticCalculation.ComplexoSortidoV, AutomaticCalculation.SaturacaoAluminio], horizon.idRealm);
                break;
            case ChemistryQuestionsType.ComplexoSortidoAI.type:
                this.doAutomaticCalculation([AutomaticCalculation.ComplexoSortidoT, AutomaticCalculation.SaturacaoAluminio], horizon.idRealm);
                break;
            case ChemistryQuestionsType.ComplexoSortidoH.type:
                this.doAutomaticCalculation([AutomaticCalculation.ComplexoSortidoT], horizon.idRealm);
                break;
            case ChemistryQuestionsType.ComplexoSortidoT.type:
                this.doAutomaticCalculation([AutomaticCalculation.ComplexoSortidoV, AutomaticCalculation.SaturacaoSodio], horizon.idRealm);
                break;
            case ChemistryQuestionsType.AtaqueSulfúricoSiO2.type:
                this.doAutomaticCalculation([AutomaticCalculation.RelacaoKI, AutomaticCalculation.RelacaoKR], horizon.idRealm);
                break;
            case ChemistryQuestionsType.AtaqueSulfúricoAl2O3.type:
                this.doAutomaticCalculation([AutomaticCalculation.RelacaoKI, AutomaticCalculation.RelacaoKR, AutomaticCalculation.RelacaoAl2O3FE2O3], horizon.idRealm);
                break;
            case ChemistryQuestionsType.AtaqueSulfúricoFe2O3.type:
                this.doAutomaticCalculation([AutomaticCalculation.RelacaoKR, AutomaticCalculation.RelacaoAl2O3FE2O3], horizon.idRealm);
                break;
            case FisicsQuestionsType.Pebble.type:
            case FisicsQuestionsType.Gravel.type:
                this.equalToMaxValueCalc([
                    FisicsQuestionsType.Pebble,
                    FisicsQuestionsType.Gravel,
                    FisicsQuestionsType.ThinEarth], 1000, value, FisicsQuestionsType.ThinEarth, horizon.idRealm);
                break;
            case FisicsQuestionsType.AreiaGrossa.type:
            case FisicsQuestionsType.AreiaFina.type:
            case FisicsQuestionsType.Argila.type:
                this.equalToMaxValueCalc([
                    FisicsQuestionsType.AreiaGrossa,
                    FisicsQuestionsType.AreiaFina,
                    FisicsQuestionsType.Argila], 1000, value, FisicsQuestionsType.Silte, horizon.idRealm);
                if (type === FisicsQuestionsType.Argila.type) {
                    this.doAutomaticCalculation([AutomaticCalculation.GrauFloculacao, AutomaticCalculation.SilteArgila], horizon.idRealm);
                }
                break;

            default:
                break;
        }
    }

    equalToMaxValueCalc(equalToMaxValueCalcs, defaut, value, horizonType, idRealm) {
        const tempEqualToMaxValueCalcs = [];
        for (let i = 0; i < equalToMaxValueCalcs.length; i++) {
            tempEqualToMaxValueCalcs[equalToMaxValueCalcs[i].name] = equalToMaxValueCalcs[i];
        }
        let tempHorizons = [];
        if (localStorage.getItem(idRealm)) {
            tempHorizons = JSON.parse(localStorage.getItem(idRealm));
        }
        for (let i = 0; i < tempHorizons.length; i++) {
            const tempHorizon = tempHorizons[i];
            if (tempEqualToMaxValueCalcs[tempHorizon.name] !== undefined) {
                console.log(defaut);
                defaut = defaut - tempHorizon.answer.value;
            }
        }
        this.onSaveAutomaticCalculation(idRealm, horizonType, defaut);
    }

    getHorizons(type, idRealm) {
        const horizons = JSON.parse(localStorage.getItem(idRealm));
        if (horizons === null || horizons === undefined) {
            return undefined;
        }
        for (let i = 0; i < horizons.length; i++) {
            if (type === horizons[i].type) {
                return horizons[i];
            }
        }
    }

    renameHorizon(idRealm, value) {
        this.horizonslist.forEach((item, i) => {
            if (idRealm === this.horizonslist[i].idRealm) {
                // if (value === '') {
                //     value = obj.name.substring(0, 1);
                // }

                this.horizonslist[i].name = value;
            }
        });
        localStorage.setItem(this.codeExamination + '-horizon', JSON.stringify(this.horizonslist));
    }


    getAnswerByType(type, horizonIndex) {
        let tempHorizons = [];
        if (localStorage.getItem(horizonIndex)) {
            tempHorizons = JSON.parse(localStorage.getItem(horizonIndex));
        }
        for (let i = 0; i < tempHorizons.length; i++) {
            if (tempHorizons[i].type === type) {
                if (tempHorizons[i].type === 18 || tempHorizons[i].type === 19) {
                    return tempHorizons[i].answer.value['value'];
                } else {
                    return tempHorizons[i].answer.value;
                }
            }
        }
        return null;
    }

    // Executa a sequencia de calculos.
    doAutomaticCalculation(calculations, horizonIndex) {
        for (let i = 0; i < calculations.length; i++) {
            // let value = this.props.defaultVal;
            const cal = calculations[i];
            let calculation = cal.calc;
            const variables = cal.variables;
            let doCalc = true;
            let value = '';
            if (calculation) {
                for (let index = 0; index < variables.length; index++) {
                    const type = variables[index];
                    let val = this.getAnswerByType(type, horizonIndex);
                    if (val != null) {
                        val = val !== '' ? val : 0;
                        console.log(val);
                        calculation = this.calculationReplace('v' + (index + 1), calculation, val);
                        console.log(calculation);
                    } else {
                        doCalc = false;
                        break;
                    }
                    if (index === variables.length - 1) {
                        // tslint:disable-next-line:no-eval
                        value = String(eval(calculation));
                        console.log(value);
                    }


                }
            }
            if (doCalc) {
                this.onSaveAutomaticCalculation(horizonIndex, cal.to, value);
            }
        }


    }

    onSaveAutomaticCalculation(idRealm, horizonType, value) {
        let tempHorizons = [];
        if (localStorage.getItem(idRealm)) {
            tempHorizons = JSON.parse(localStorage.getItem(idRealm));
        }
        let modoEdicao = false;
        for (let i = 0; i < tempHorizons.length; i++) {
            if (tempHorizons[i].type === horizonType.type) {
                tempHorizons[i].answer.value = value;
                modoEdicao = true;
                break;
            }
        }

        if (!modoEdicao) {
            tempHorizons.push({
                type: horizonType.type,
                id: 0,
                name: horizonType.name,
                idRealm: uuid.v4(),
                creationDate: new Date(),
                answer: {idRealm: uuid.v4(), id: 0, value: value}
            });
        }
        localStorage.setItem(idRealm, JSON.stringify(tempHorizons));
        this.fisicsQuestionsType = this.processar(FisicsQuestionsType);
        this.chemistryQuestionsType = this.processar(ChemistryQuestionsType);
    }

    // Faz o replace de v1, v2 e etc...
    calculationReplace(variable, calc, value) {
        if (calc.includes(variable)) {
            return this.calculationReplace(variable, calc.replace(variable, value), value);
        } else {
            return calc;
        }
    }

    /**
     * onQuestion method is used to open a question form.
     */
    onQuestion() {
        this.router.navigate(['/pergunta/formulario/', this.codeExamination]);
    }


}
