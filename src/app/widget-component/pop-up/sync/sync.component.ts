import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {MatDialogRef, MatDialog} from '@angular/material';

@Component({
    selector: 'ms-sync',
    templateUrl: './sync.component.html',
    styleUrls: ['./sync.component.scss']
})
export class SyncComponent implements OnInit {

    data: any;

    constructor(public dialogRef: MatDialogRef<SyncComponent>) {
    }

    ngOnInit() {

    }

    /**
     *onFormSubmit method is used to submit the edit new user dialaog form and close the dialog.
     */
    onFormSubmit() {
        this.dialogRef.close('OK');
    }
}
