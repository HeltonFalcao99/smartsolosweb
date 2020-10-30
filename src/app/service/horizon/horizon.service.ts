import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HorizonService {

    constructor() {
    }

    getLocalStorage(codeExamination) {
        return JSON.parse(localStorage.getItem(codeExamination + '-horizonDesignation'));
    }

    getGeneralQuestionsType(codeExamination) {
        const ret = localStorage.getItem(codeExamination + '-generalQuestionsType') ? JSON.parse(localStorage.getItem(codeExamination + '-generalQuestionsType')) : [];
        return ret;
    }

    getHorizon(codeExamination) {
        return JSON.parse(localStorage.getItem(codeExamination + '-horizon'));
    }

    getExams(codeProject) {
        return localStorage.getItem(codeProject + '-exams') ? JSON.parse(localStorage.getItem(codeProject + '-exams')) : [];
    }

    getHorizonQuestion(codeHorizon) {
        return localStorage.getItem(codeHorizon) ? JSON.parse(localStorage.getItem(codeHorizon)) : [];
    }


    setLocalStorage(codeExamination, horizonlist) {
        localStorage.setItem(codeExamination + '-horizon', JSON.stringify(horizonlist));
        localStorage.setItem(codeExamination + '-horizonDesignation', JSON.stringify(horizonlist));
    }


    // localStorageDelete(horizon: any, codeExamination: any) {
    //     this.delete(horizon, codeExamination + '-horizon');
    //     this.delete(horizon, codeExamination + '-horizonDesignation');
    // }


    public delete(horizon: any, key: string) {
        const horizons: any = JSON.parse(localStorage.getItem(key + '-horizon'));
        const temp = [];
        for (let i = 0; i < horizons.length; i++) {
            if (horizons[i].idRealm !== horizon.idRealm) {
                temp.push(horizons[i]);
            }
        }
        localStorage.setItem(key + '-horizon', JSON.stringify(temp));
    }
}
