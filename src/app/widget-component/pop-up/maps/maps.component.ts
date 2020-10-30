import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
    selector: 'ms-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

    lat: number = 40.730610;
    lng: number = -73.935242;
    data: any;
    coordenadas = {
        lat: 0,
        lng: 0
    }

    constructor(public dialogRef: MatDialogRef<MapsComponent>,
                public router: Router) {
    }

    ngOnInit() {
        this.coordenadas.lat = this.data.lat;
        this.coordenadas.lng = this.data.lng;
    }

    onSubmit() {
        this.dialogRef.close(this.coordenadas);
    }

    markerDragEnd(e) {
        this.coordenadas.lat = e.coords.lat;
        this.coordenadas.lng = e.coords.lng;
    }


}
