import {Injectable} from '@angular/core';

export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: 'projeto',
        name: 'Projetos',
        type: 'link',
        icon: 'home'
    },
    {
        state: 'usuario',
        name: 'Usuário',
        type: 'link',
        icon: 'supervised_user_circle'

    }

];

@Injectable()
export class MenuItems {
    getAll(): Menu[] {
        return MENUITEMS;
    }

    add(menu: any) {
        MENUITEMS.push(menu);
    }
}
