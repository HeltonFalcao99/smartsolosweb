import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import {Md5} from 'ts-md5';
import {HorizonsQuestionsType} from '../../../consts/consts.question';
import {ChemistryQuestionsType} from '../../../consts/consts.quimica';
import {FisicsQuestionsType} from '../../../consts/consts.fisica';
import * as uuid from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor() {
    }


    public ecryptAES(text: string) {
        const key = CryptoJS.enc.Utf8.parse(String(Md5.hashStr(environment.KEY)));
        const iv = CryptoJS.enc.Utf8.parse(environment.IV);
        const encrypted = CryptoJS.AES.encrypt(text, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        return encrypted.toString();
    }


    public decryptAES(text: string) {
        const key = CryptoJS.enc.Utf8.parse(String(Md5.hashStr(environment.KEY)));
        const iv = CryptoJS.enc.Utf8.parse(environment.IV);
        const decrypted = CryptoJS.AES.decrypt(text, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    }


    public isObject(value) {
        return value !== null && typeof value === 'object';
    }

    public stringToObject(obj) {
        if (obj.type === 21 ||
            obj.type === 92 ||
            obj.type === 93 ||
            obj.type === 18 ||
            obj.type === 19) {
            return JSON.parse(obj.answer.value);
        }
        return obj.answer.value;

    }


}
